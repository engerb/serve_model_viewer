import React from "react";

class ModelViewer extends React.Component {
    constructor(props) {
        super(props);
        
        // ...
    }

    componentDidMount() {
        this.init();
		this.renderScene();
    }

    init() {
        this.container = document.createElement( 'div' );

        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
        this.camera.position.set( 1.5, 1, 1.7 );

        this.scene = new THREE.Scene();

        new THREE.RGBELoader()
            .setDataType( THREE.UnsignedByteType )
            .setPath( '/src/assets/3d/' )
            .load( 'venetian_crossroads_1k.hdr', ( texture )=> {

                var envMap = pmremGenerator.fromEquirectangular( texture ).texture;

                // this.scene.background = envMap; // if you want hdri as image
                this.scene.environment = envMap;

                texture.dispose();
                pmremGenerator.dispose();

                this.renderScene();
            } );

        var loader = new THREE.GLTFLoader();
        var dracoLoader = new THREE.DRACOLoader();
        dracoLoader.setDecoderPath( 'node_modules/three/examples/js/libs/draco/' ); //this is so dumb
        loader.setDRACOLoader( dracoLoader );
        loader.load( '/src/assets/3d/serve.glb',                
            // called when the resource is loaded
            ( gltf ) => {
                gltf.scene.traverse( ( child )=> {
                    if ( child.isMesh ) {
                        // console.log(child);
                    }
                } );
                this.scene.add(gltf.scene);
                this.renderScene();
            },
            function (xhr) {
                // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (error) {
                console.log('An error happened');
            }

        );

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
        this.controls.addEventListener( 'change', function() { // only render when we move or something else
            this.renderScene();
        }.bind(this));
        this.controls.addEventListener
        this.controls.minDistance = 2;
        this.controls.maxDistance = 10
        this.controls.target.set( 0, 0.5, 0 );
        // this.controls.enableDamping = true;
        // this.controls.dampingFactor = 0.05;
        this.controls.minPolarAngle = 0.3;
        this.controls.maxPolarAngle = 1.7;
        this.controls.update();

        window.addEventListener('resize', function() {
            this.onWindowResize();
        }.bind(this), false);
        
        this.mount.appendChild( this.container );
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );

        this.renderScene();
    }

    renderScene() {
        // this.controls.update();
        this.renderer.render( this.scene, this.camera );
    }

    render() {
        return (
            <div ref={ref => (this.mount = ref)} />
        );
    }
}

export default ModelViewer;