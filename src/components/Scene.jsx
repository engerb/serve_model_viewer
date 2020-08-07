import React from "react";
import Serve from '../assets/3d/Serve/Serve';
import Customizer from './Customizer';

class Scene extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            visible: '',
            lidOpen: false,
            renderNeeded: false,
        };

        // these should all be in state with serve observing state as a real component instead of a js object
        // all this shit will use react three, but maybe a propper state manager too?
        // this.setBinWrap = this.setBinWrap.bind(this);
        // this.setLidWrap = this.setLidWrap.bind(this);
        // this.setBinColor = this.setBinColor.bind(this);
        // this.setLidColor = this.setLidColor.bind(this);
        // this.setDefaults = this.setDefaults.bind(this);
        // this.setLidPos = this.setLidPos.bind(this);
        // this.setSpeed = this.setSpeed.bind(this);
        // this.setSteer = this.setSteer.bind(this);
        // this.renderOut = this.renderOut.bind(this);
    }

    setSpeed() {

    }

    setSteer() {

    }

    renderOut( options ) {
        this.userCameraLoc = { x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z };

        if (options.type == 'video') {
            
            this.capturer = new CCapture( {
                framerate: 24,
                format: 'png',
                name: 'animation',
            } );

            this.capturer.start();

            const from = { x: 1.5, y: 1, z: 1.7 };
            const to = {x: -1.483, y: 1.4, z: 1.54 };
            const duration = 2000; 
            
            const animation = new TWEEN.Tween(from).to(to, duration); 
    
            animation.onUpdate(()=>{
                this.capturer.capture( this.renderer.domElement );
                this.camera.position.set( from.x, from.y, from.z );
            });

            animation.onComplete(() => { 
                this.camera.position.set( this.userCameraLoc.x, this.userCameraLoc.y, this.userCameraLoc.z );

                this.capturer.stop();  
                this.capturer.save( ( blob ) => { 
                    const url = window.URL.createObjectURL( blob );
                    const tempLink = document.createElement('a');
                    tempLink.href = url;
                    tempLink.setAttribute('download', 'animation.tar');
                    tempLink.click();
                });
            });
    
            animation.start();

        } else {
            this.renderer.domElement.toBlob( ( blob ) => {
                    const url = window.URL.createObjectURL( blob );
                    const tempLink = document.createElement('a');
                    tempLink.href = url;
                    tempLink.setAttribute('download', 'render.png');
                    tempLink.click();
            }, 'image/png');
        }
    }

    componentDidMount() {
        this.init();
        this.animate();
    }

    // setBinWrap( binWrap ) {
    //     this.setState({ binWrap: binWrap });
    //     this.serve.setBinWrap( binWrap );
    // }

    // setLidWrap( lidWrap ) {
    //     this.setState({ lidWrap: lidWrap });
    //     this.serve.setLidWrap( lidWrap );
    // }

    // setBinColor( binColor ) {
    //     this.setState({ binColor: binColor });
    //     this.serve.setBinColor( binColor );
    // }

    // setLidColor( lidColor ) {
    //     this.setState({ lidColor: lidColor });
    //     this.serve.setLidColor( lidColor );
    // }

    // setLidPos( lidOpen = this.state.lidOpen ) { 
    //     this.setState({ lidOpen: !lidOpen });
    //     this.serve.setLidPos( lidOpen ); 
    // }

    // setDefaults( obj ) {
    //     this.setState({
    //         binWrap: obj.binWrap,
    //         lidWrap: obj.lidWrap,
    //         binColor: obj.binColor, 
    //         lidColor: obj.lidColor,
    //     });
    // }

    init() {
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
        this.camera.position.set( 1.5, 1, 1.7 ); 

        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true, preserveDrawingBuffer: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;//0.8;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        var pmremGenerator = new THREE.PMREMGenerator( this.renderer );
        pmremGenerator.compileEquirectangularShader();

        new THREE.RGBELoader()
            .setDataType( THREE.UnsignedByteType )
            .load( require('../assets/3d/venice_sunset_1k.hdr').default, ( texture ) => {
                const envMap = pmremGenerator.fromEquirectangular( texture ).texture;

                // this.scene.background = envMap; // if you want hdri as image
                this.scene.environment = envMap;

                texture.dispose();
                pmremGenerator.dispose();

                this.setState({ renderNeeded: true });
            });

        // Load our model with some default textures and add when loaded via promise
        this.serve = new Serve();
        this.serve.modelLoaded.then(() => {
            this.scene.add( this.serve.scene );
            this.setState({ renderNeeded: true });

            this.serve.setBinWrap( this.state.binWrap );
            this.serve.setLidWrap( this.state.lidWrap );
            this.serve.setBinColor( this.state.binColor );
            this.serve.setLidColor( this.state.lidColor );

            this.playIntro();
        });

        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        this.controls.addEventListener('change', ()=>{ this.setState({ renderNeeded: true }) } );
        this.controls.target.set( 0, 0.5, 0 );
        Object.assign(this.controls, {
            minDistance: 1,
            maxDistance: 5,
            enableDamping: true,
            dampingFactor: 0.3,
            minPolarAngle: 0.3,
            maxPolarAngle: 1.7,
        });

        // react?
        window.addEventListener('resize', function() {
            this.onWindowResize();
        }.bind(this), false);
        
        this.mount.appendChild( this.renderer.domElement );
    }

    animate() {
        requestAnimationFrame( ()=> { this.animate() } );
        
        if ( this.state.renderNeeded || TWEEN.getAll().length || this.serve.renderNeeded ) {
            this.renderScene();
            this.setState({ renderNeeded: false });
            this.serve.renderNeeded = false;
        }

        this.controls.update();
        TWEEN.update();
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );

        this.renderScene();
    }

    renderScene() {
        this.renderer.render( this.scene, this.camera );
    }

    playIntro() {
        this.setState({
            visible: 'visible'
        });
        this.serve.playIntro();
    }

    render() {
        return (
            <div className="modelViewerMain">
                <div className={`modelViewer ${this.state.visible}`} ref={ref => (this.mount = ref)} /> 
                
                {this.props.customizer ? <Customizer 
                    // setBinWrap = { this.setBinWrap.bind(this) }
                    // setLidWrap = { this.setLidWrap.bind(this) }
                    // setBinColor = { this.setBinColor.bind(this) }
                    // setLidColor = { this.setLidColor.bind(this) }
                    // setDefaults = { this.setDefaults.bind(this) }
                    // setLidPos = { this.setLidPos.bind(this) }
                    // setSpeed = { this.setSpeed.bind(this) }
                    // setSteer = { this.setSteer.bind(this) }
                    // renderOut = { this.renderOut.bind(this) }
                    DefaultCMF = {this.props.DefaultCMF}
                /> : null}
            </div>
        );
    }
}

export default Scene;