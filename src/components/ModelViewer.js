import React from "react";
import Serve from '../assets/3d/Serve/Serve';
import Customizer from './Customizer';

class ModelViewer extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { class: 'modelViewer' };
        this.updateBinTexture = this.updateBinTexture.bind(this);
        this.updateLidTexture = this.updateLidTexture.bind(this);
        this.setLidColor = this.setLidColor.bind(this);
        this.setBinColor = this.setBinColor.bind(this);
        this.setDefaults = this.setDefaults.bind(this);
        this.currentBin;
        this.currentLid;
        this.renderNeeded = false;
        this.cameraAnimation = false;
    }

    componentDidMount() {
        this.init();
        this.animate();
    }

    updateBinTexture(texture) {
        this.serve.loadBinWrap(texture);
        // camera to bin
    }

    updateLidTexture(texture) {
        this.serve.loadLidWrap(texture);
        // camera to lid
    }

    setLidColor(col) {
        this.serve.setLidColor( col );
    }

    setBinColor(col) {
        this.serve.setBinColor( col );
    }

    toggleLid() {
        this.serve.toggleLid();
    }

    setDefaults(bin, lid) {
        this.currentBin = bin;
        this.currentLid = lid;
    }

    init() {
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
        this.camera.position.set( 1.5, 1, 1.7 );

        this.scene = new THREE.Scene();

        new THREE.RGBELoader()
            .setDataType( THREE.UnsignedByteType )
            .load( require('../assets/3d/venice_sunset_1k.hdr').default, ( texture ) => {
                var envMap = pmremGenerator.fromEquirectangular( texture ).texture;

                // this.scene.background = envMap; // if you want hdri as image
                this.scene.environment = envMap;

                texture.dispose();
                pmremGenerator.dispose();

                this.renderNeeded = true;
            });

        // Load our model with some default textures and add when loaded via promise
        this.serve = new Serve({bin: this.currentBin, lid: this.currentLid})
        this.serve.modelLoaded.then(() => {
            this.scene.add( this.serve.scene );
            this.renderNeeded = true;
            this.playIntro();
        });
        this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.8;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        var pmremGenerator = new THREE.PMREMGenerator( this.renderer );
        pmremGenerator.compileEquirectangularShader();

        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        this.controls.addEventListener('change', ()=>{ this.renderNeeded = true; } );

        this.controls.addEventListener
        this.controls.minDistance = 1;
        this.controls.maxDistance = 5;
        this.controls.target.set( 0, 0.5, 0 );
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.3;
        this.controls.minPolarAngle = 0.3;
        this.controls.maxPolarAngle = 1.7;
        this.controls.update();

        window.addEventListener('resize', function() {
            this.onWindowResize();
        }.bind(this), false);
        
        this.mount.appendChild( this.renderer.domElement );
    }

    animate() {
        requestAnimationFrame( ()=> { this.animate() } );
        
        if ( this.renderNeeded || TWEEN.getAll().length || this.serve.renderNeeded ) {
            this.renderScene();
            this.renderNeeded = false;
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
            class: 'modelViewer visible'
        });
    }

    render() {
        return (
            <div className="modelViewerMain">
                <div className={this.state.class} ref={ref => (this.mount = ref)} />
                <Customizer 
                    updateBinTexture = {this.updateBinTexture} 
                    updateLidTexture = {this.updateLidTexture} 
                    setBinColor = {this.setBinColor}
                    setLidColor = {this.setLidColor}
                    setDefaults = {this.setDefaults} />
                <div className='toggleLid' onClick = {(e) => this.toggleLid()}>
                    <p>Toggle lid</p>
                </div>
            </div>
        );
    }
}

export default ModelViewer;