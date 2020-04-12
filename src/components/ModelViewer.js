import React from "react";
import Serve from '../assets/3d/Serve/Serve';

class ModelViewer extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { class: 'modelViewer' };
    }

    componentDidMount() {
        this.renderNeeded = false;
        this.init();
        this.animate();
    }

    init() {
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
        this.camera.position.set( 1.5, 1, 1.7 );

        this.scene = new THREE.Scene();

        new THREE.RGBELoader()
            .setDataType( THREE.UnsignedByteType )
            .setPath( '/src/assets/3d/' )
            .load( 'venice_sunset_1k.hdr', ( texture )=> {
                var envMap = pmremGenerator.fromEquirectangular( texture ).texture;

                // this.scene.background = envMap; // if you want hdri as image
                this.scene.environment = envMap;

                texture.dispose();
                pmremGenerator.dispose();

                this.renderNeeded = true;
            } );
        
        // Object with promise
        this.serve = new Serve() // give first cmf wrapps
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
        this.controls.maxDistance = 10
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
        
        if (this.renderNeeded) { // or animations playing
            this.renderScene();
            // progress animation
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
            <div className={this.state.class} ref={ref => (this.mount = ref)} />
        );
    }
}

export default ModelViewer;