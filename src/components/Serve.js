import { reject } from "async";

class Serve {
    constructor(file = 'serve.glb', path = '/src/assets/3d/') {
        this.file = file;
        this.path = path;

        this.loader();
    }

    loader() {
        this.modelLoaded = new Promise(( resolve, rejust ) =>{
            var loader = new THREE.GLTFLoader();
            var dracoLoader = new THREE.DRACOLoader();
            dracoLoader.setDecoderPath( 'node_modules/three/examples/js/libs/draco/' ); //this is so dumb
            loader.setDRACOLoader( dracoLoader );
            loader.load( '/src/assets/3d/serve.glb',                
                // called when the resource is loaded
                ( gltf ) => {
                    gltf.scene.traverse( ( child )=> {
                        // if ( child.isMesh ) {
                            // console.log(child);
                        // }
                    } );

                    this.scene = gltf.scene;
                    // scene.add( this.scene );
                    resolve();
                },
                function (xhr) {
                    // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                function (error) {
                    console.log('An error happened');
                    reject();
                }
            );
        });
    }
}

export default Serve;