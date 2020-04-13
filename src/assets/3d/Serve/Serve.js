class Serve {
    constructor( props ) {
        this.props = props;
        
        this.file = props.hasOwnProperty('file') ? props.file : 'serve.glb';
        this.path = props.hasOwnProperty('path') ? props.path : '/src/assets/3d/Serve/';
        
        this.animation = false;
        this.lid = 'close';
        this.speed = 0.0;
        this.steering = 0.0; 

        this.createMats();
        this.loader();
    }

    loader() {
        this.modelLoaded = new Promise(( resolve, reject ) => {
            var loader = new THREE.GLTFLoader();
            var dracoLoader = new THREE.DRACOLoader();
            dracoLoader.setDecoderPath( 'node_modules/three/examples/js/libs/draco/' );
            loader.setDRACOLoader( dracoLoader );
            loader.load( this.path + this.file,                
                // called when the resource is loaded
                ( gltf ) => {
                    gltf.scene.traverse( ( child ) => {
                        this.handleChildren( child );
                    });

                    this.scene = gltf.scene;
                    resolve();
                },
                ( xhr ) => {
                    // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                ( error ) => {
                    console.log('An error happened');
                    reject();
                }
            );
        });
    }

    loadLidWrap(url) {
        new Promise(( resolve, reject ) => { 
            // image loader
        }).then(( ) => {

        });
    }

    loadBinWrap(url) {
        new Promise(( resolve, reject ) => { 
            // image loader
        }).then(( ) => {

        });
    }

    toggleLid( action = 'open' ) {

    }

    tireSpeed( speed = 0.0 ) {

    }

    tireAngle( angle = 0.0 ) {

    }

    handleChildren( child ) {
        switch (child.name) {
            // Handles for later animaion / selection
            case 'root':
                this.handle_root = child;
                break;
            case 'center':
                this.handle_center = child;
                break;
            case 'lid':
                this.handle_lid = child;
                break;
            case 'boggy_l':
                this.handle_boggy_l = child;
                break;
            case 'boggy_r':
                this.handle_boggy_r = child;
                break;
            case 'wheel_fl':
                this.handle_wheel_fl = child;
                break;
            case 'wheel_fr':
                this.handle_wheel_fr = child;
                break;
            case 'wheel_rl':
                this.handle_wheel_rl = child;
                break;
            case 'wheel_rr':
                this.handle_wheel_rr = child;
                break;

            // Main CMF layered materials
            case 'bin':
                child.geometry.clearGroups();
                child.geometry.addGroup( 0, Infinity, 0 );
                child.geometry.addGroup( 0, Infinity, 1 );
                child.material = this.mat_bin;
                this.geo_bin = child; 
                break;
            case 'lid_top':
                child.geometry.clearGroups();
                child.geometry.addGroup( 0, Infinity, 0 );
                child.geometry.addGroup( 0, Infinity, 1 );
                child.material = this.mat_lid;
                this.geo_lid = child;
                break;

            // Other materials
            case 'aluminum':
            case 'rim_fl':
            case 'rim_fr':
            case 'rim_rl':
            case 'rim_rr':  
                child.material = this.mat_aluminum;
                break; 
            case 'black_plastic': 
            case 'black_plastic_base':
            case 'lid_liner':  
                child.material = this.mat_black_plastic;
                break;
            case 'liner':
            case 'lid_inside':
                child.material = this.mat_white_plastic;
                break;
            case 'tire_rubber_fl':
            case 'tire_rubber_fr':
            case 'tire_rubber_rl':
            case 'tire_rubber_rr':
                child.material = this.mat_tires;
                break;
            case 'boggy_arm_l':
            case 'boggy_arm_r':
            case 'motor_fl':
            case 'motor_fr':
            case 'motor_rl':
            case 'motor_rr':
                child.material = this.mat_black_metal_smooth;
                break;
            case 'eye_lense':
            case 'strip':
                // layer these if you want lights too
                child.material = this.mat_strip_eyes;
                break;
            case 'tail_lights':
                // layer these if you want lights too
                child.material = this.mat_tail_lights;
                break;
            case 'screen':
                child.material = this.mat_screen;
                break;
            case 'floor':
                child.material = this.mat_floor;
                break;
            case 'blocker':
                child.material = this.mat_blocker;
                break;
            case 'black_glass':
                child.material = this.mat_lense;
                break;
            case 'eye_plate':
                child.material = this.mat_black_metal_rough;
                break;
            
            default:
                // ...
        }
    }

    createMats() {
        this.tire_ao = new THREE.TextureLoader().load( require('./tire_ao.jpg').default );
        this.tire_normal = new THREE.TextureLoader().load( require('./tire_normal.jpg').default );
        this.bin_ao = new THREE.TextureLoader().load( require('./bin_ao.jpg').default );
        this.lid_ao = new THREE.TextureLoader().load( require('./lid_ao.jpg').default );
        this.floor_ao = new THREE.TextureLoader().load( require('./floor_ao.jpg').default );
        this.black_ao = new THREE.TextureLoader().load( require('./black_ao.jpg').default );
        this.white_ao = new THREE.TextureLoader().load( require('./white_ao.jpg').default );
        this.aluminum_1024px_ao = new THREE.TextureLoader().load( require('./aluminum_1024px_ao.jpg').default );
        this.cloud_spec = new THREE.TextureLoader().load( require('./cloud_spec.jpg').default );
        this.cloud_light_spec = new THREE.TextureLoader().load( require('./cloud_light_spec.jpg').default );

        // this.bin_dif = new THREE.TextureLoader().load( require('./wraps/bin_1.png').default ); // take args for texture
        // this.lid_dif = new THREE.TextureLoader().load( require('./wraps/lid_1.png').default ); // take args for texture
        this.bin_dif = new THREE.TextureLoader().load( this.props.bin ); // take args for texture
        this.lid_dif = new THREE.TextureLoader().load( this.props.lid ); // take args for texture

        this.tire_ao.wrapS = 
        this.tire_ao.wrapT = 
        this.tire_normal.wrapS = 
        this.tire_normal.wrapT = THREE.RepeatWrapping;

        this.tire_ao.flipY =
        this.tire_normal.flipY =
        this.bin_ao.flipY =
        this.lid_ao.flipY =
        this.bin_dif.flipY =
        this.lid_dif.flipY =
        this.floor_ao.flipY =
        this.black_ao.flipY =
        this.white_ao.flipY =
        this.cloud_spec.flipY =
        this.cloud_light_spec.flipY =
        this.aluminum_1024px_ao.flipY = false;

        this.mat_vinyl_bin = new THREE.MeshPhysicalMaterial({
            roughness: 0.4,
            color: 0xffffff,
            transparency: 0, 
            opacity: 1,                
            transparent: true,
            aoMap: this.bin_ao,
            map: this.bin_dif,
            roughnessMap: this.cloud_light_spec,
        });

        this.mat_bin = new THREE.MeshPhysicalMaterial({
            roughness: 0.3,
            color: 0xEEEEEE,
            aoMap: this.bin_ao,
            roughnessMap: this.cloud_light_spec,
        });

        this.mat_vinyl_lid = new THREE.MeshPhysicalMaterial({
            roughness: 0.4,
            color: 0xffffff,
            transparency: 0, 
            opacity: 1,                
            transparent: true,
            aoMap: this.lid_ao,
            map: this.lid_dif,
            roughnessMap: this.cloud_light_spec,
        });

        this.mat_lid = new THREE.MeshPhysicalMaterial({
            roughness: 0.3,
            color: 0xEEEEEE,
            aoMap: this.lid_ao,
            roughnessMap: this.cloud_light_spec,
        });

        this.mat_bin = [ this.mat_vinyl_bin, this.mat_bin ];
        this.mat_lid = [ this.mat_vinyl_lid, this.mat_lid ];

        this.mat_black_plastic = new THREE.MeshPhysicalMaterial({
            roughness: 0.8,
            color: 0x111111,
            aoMap: this.black_ao,
            roughnessMap: this.cloud_light_spec,
            aoMapIntensity: 1.5,
        });

        this.mat_white_plastic = new THREE.MeshPhysicalMaterial({
            roughness: 0.5,
            color: 0xEEEEEE,
            aoMap: this.white_ao,
            roughnessMap: this.cloud_light_spec,
        });

        this.mat_lense = new THREE.MeshPhysicalMaterial({
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            roughness: 0,
            color: 0x0A0716,
        });

        this.mat_screen = new THREE.MeshPhysicalMaterial({
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            roughness: 0,
            color: 0x0A0716,
            roughnessMap: this.cloud_light_spec,
        });

        this.mat_aluminum = new THREE.MeshPhysicalMaterial({
            clearcoat: 0.5,
            clearcoatRoughness: 0.1,
            metalness: 0.9,
            roughness: 0.5,
            color: 0xe8c6e1,
            aoMap: this.aluminum_1024px_ao,
            aoMapIntensity: 1.5,
            roughnessMap: this.cloud_light_spec,
        });

        this.mat_tires = new THREE.MeshPhysicalMaterial({
            roughness: 0.8,
            color: 0x111111,
            normalMap: this.tire_normal,
            normalScale: new THREE.Vector2( -2, -2 ),
            aoMap: this.tire_ao,
            aoMapIntensity: 0.5,
            roughnessMap: this.cloud_light_spec,
        });

        // emissive combine layers for later
        this.mat_strip_eyes = new THREE.MeshPhysicalMaterial({
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            roughness: 0.2,
            color: 0xACACAC,
            roughnessMap: this.cloud_light_spec,
        });

        this.mat_tail_lights = new THREE.MeshPhysicalMaterial({
            roughness: 0,
            color: 0x9F1313,
            roughnessMap: this.cloud_light_spec,
        });

        this.mat_black_metal_rough = new THREE.MeshPhysicalMaterial({
            metalness: 0.9,
            roughness: 0.7,
            color: 0x1D1D1D,
            aoMap: this.black_ao,
            roughnessMap: this.cloud_light_spec,
        });

        this.mat_black_metal_smooth = new THREE.MeshPhysicalMaterial({
            metalness: 0.9,
            roughness: 0.4,
            color: 0x1D1D1D,
            aoMap: this.black_ao,
            roughnessMap: this.cloud_light_spec,
            aoMapIntensity: 1.5,
        });

        this.mat_blocker = new THREE.MeshLambertMaterial({
            color: 0xEEEEEE,
        });

        this.mat_floor = new THREE.MeshLambertMaterial({
            color: 0x000000,
            alphaMap: this.floor_ao,
            transparent: true,
            opacity: 1,
        });
    } 
}

export default Serve;