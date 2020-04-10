import React from "react";
import Serve from './Serve';

class ModelViewer extends React.Component {
    constructor(props) {
        super(props);
        
        // ...
    }

    componentDidMount() {
        this.renderNeeded = false;
        this.init();
        this.animate();
    }

    init() {
        this.container = document.createElement( 'div' );

        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
        this.camera.position.set( 1.5, 1, 1.7 );

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xf8f8f8 );

        new THREE.RGBELoader()
            .setDataType( THREE.UnsignedByteType )
            .setPath( '/src/assets/3d/' )
            .load( 'venetian_crossroads_1k.hdr', ( texture )=> {

                var envMap = pmremGenerator.fromEquirectangular( texture ).texture;

                // this.scene.background = envMap; // if you want hdri as image
                this.scene.environment = envMap;

                texture.dispose();
                pmremGenerator.dispose();
            } );
        
        // Object with promise
        this.serve = new Serve( this.scene, 'serve.glb', '/src/assets/3d/' )
        this.serve.modelLoaded.then(() => {
            this.scene.add( this.serve.scene );
            this.renderNeeded = true;
            // this.playIntro();
        });

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.8;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.container.appendChild( this.renderer.domElement );

        var pmremGenerator = new THREE.PMREMGenerator( this.renderer );
        pmremGenerator.compileEquirectangularShader();

        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        this.controls.addEventListener('change', ()=>{ this.renderNeeded = true; } );

        this.controls.addEventListener
        this.controls.minDistance = 2;
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
        
        this.mount.appendChild( this.container );
    }

    animate() {
        requestAnimationFrame( ()=> { this.animate() } );
        
        if (this.renderNeeded) {
            this.renderScene();
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
        console.log('render');
    }

    render() {
        return (
            <div ref={ref => (this.mount = ref)} />
        );
    }
}

export default ModelViewer;