import React from "react";
import Serve from '../assets/3d/Serve/Serve';
import Customizer from './Customizer';

class ModelViewer extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { class: 'modelViewer' };
        this.updateBin = this.updateBin.bind(this);
        this.updateLid = this.updateLid.bind(this);
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

    updateBin(texture) {
        this.serve.loadBinWrap(texture);
    }

    updateLid(texture) {
        this.serve.loadLidWrap(texture);
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
            .setPath( '/src/assets/3d/' )
            .load( 'venice_sunset_1k.hdr', ( texture ) => {
                var envMap = pmremGenerator.fromEquirectangular( texture ).texture;

                // this.scene.background = envMap; // if you want hdri as image
                this.scene.environment = envMap;

                texture.dispose();
                pmremGenerator.dispose();

                this.renderNeeded = true;
            });

        // Object with promise
        this.serve = new Serve({bin: this.currentBin, lid: this.currentLid}) // give first cmf wrapps
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
        
        // camera and serve animation could set renderNeeded to false when done, but they could clober eachother
        if ( this.renderNeeded || this.serve.animation || this.cameraAnimation ) {
            this.renderScene();
            // progress animation here?
            this.renderNeeded = false;
        }

        this.controls.update();
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
            <div>
                <Customizer updateBin = {this.updateBin} updateLid = {this.updateLid} setDefaults = {this.setDefaults} />
                <div className={this.state.class} ref={ref => (this.mount = ref)} />
            </div>
        );
    }
}

export default ModelViewer;