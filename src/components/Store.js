import create from 'zustand';
import { sRGBEncoding, TextureLoader, Color } from "three";

// Can return the texture object or a promise wrap for it so that the state is only changed when ready
const loadTexture = (url, promise = true) => {
    if (promise) {
        return new Promise(resolve => {
            new TextureLoader().load(url, (texture) => {
                texture.flipY = false;
                texture.encoding = sRGBEncoding;
                resolve(texture);
            },
            undefined,
            (error) => {
                resolve(null)
                console.error('Loading lid wrap: An error happened: ', error);
            });
        });
    } else {
        return new TextureLoader().load(url, ( texture ) => {
            texture.flipY = false;
            texture.encoding = sRGBEncoding;
        },
        undefined,
        (error) => {
            console.error('Loading lid wrap: An error happened: ', error);
        });
    }
}

const loadColor = (hex) => {
    const color = new Color(hex);
    color.convertSRGBToLinear();

    return color;
}

const defaultCMF = {
    binIndex: 0,
    binRoughness: 0.5,
    binDecals: [
        require('../assets/3d/Serve/wraps/bin_1.png').default,
        require('../assets/3d/Serve/wraps/bin_2.png').default,
        require('../assets/3d/Serve/wraps/bin_3.png').default,
        require('../assets/3d/Serve/wraps/bin_4.png').default,
        require('../assets/3d/Serve/wraps/bin_5.png').default
    ],
    lidIndex: 0,
    lidRoughness: 0.5,
    lidDecals: [
        require('../assets/3d/Serve/wraps/lid_1.png').default,
        require('../assets/3d/Serve/wraps/lid_2.png').default,
        require('../assets/3d/Serve/wraps/lid_3.png').default,
        require('../assets/3d/Serve/wraps/lid_4.png').default,
        require('../assets/3d/Serve/wraps/lid_5.png').default
    ],
    frontIndex: null, 
    rearTopIndex: 0,
    rearBottomIndex: null,
    generalDecals: [
        require('../assets/3d/Serve/decals/decal_postmates.png').default,
        require('../assets/3d/Serve/decals/decal_mustache.png').default,
        require('../assets/3d/Serve/decals/decal_cat.png').default,
        require('../assets/3d/Serve/decals/decal_smile.png').default,
        require('../assets/3d/Serve/decals/decal_mask.png').default
        // X logo
        // Smile
        // Mask
    ],
    binColorIndex: 4, 
    lidColorIndex: 4,
    colors: [
        '#1A1A1A',
        '#FDF150',
        '#5499ED',
        '#FABC0F',
        '#FFFFFF'
    ],
    showHubCaps: true,
    hdriIndex: 0,
    hdris: [
        require('../assets/3d/venice_sunset_1k.hdr').default
    ]
}

const useStore = create((set, get) => ({
    binIndex: defaultCMF.binIndex,
    binRoughness: defaultCMF.binRoughness,
    binDecals: defaultCMF.binDecals,
    lidIndex: defaultCMF.lidIndex,
    lidRoughness: defaultCMF.lidRoughness,
    lidDecals: defaultCMF.lidDecals,
    frontIndex: defaultCMF.frontIndex, 
    rearTopIndex: defaultCMF.rearTopIndex,
    rearBottomIndex: defaultCMF.rearBottomIndex,
    generalDecals: defaultCMF.generalDecals,
    binColorIndex: defaultCMF.binColorIndex, 
    lidColorIndex: defaultCMF.lidColorIndex,
    colors: defaultCMF.colors,
    hdriIndex: defaultCMF.hdriIndex,
    hdris: defaultCMF.hdris,

    // camera angle
    // serve angle
    // camera angle on serve

    hdri: defaultCMF.hdris[ defaultCMF.hdriIndex ],
    binDecal: defaultCMF.binIndex !== null ? loadTexture(defaultCMF.binDecals[ defaultCMF.binIndex ] , false) : null,
    lidDecal: defaultCMF.lidIndex !== null ? loadTexture(defaultCMF.lidDecals[ defaultCMF.lidIndex ] , false) : null,
    frontDecal: defaultCMF.frontIndex !== null ? loadTexture(defaultCMF.generalDecals[ defaultCMF.frontIndex ] , false) : null,
    rearTopDecal: defaultCMF.rearTopIndex !== null ? loadTexture(defaultCMF.generalDecals[ defaultCMF.rearTopIndex ] , false) : null,
    rearBottomDecal: defaultCMF.rearBottomIndex !== null ? loadTexture(defaultCMF.generalDecals[ defaultCMF.rearBottomIndex ] , false) : null,
    binColor: loadColor(defaultCMF.colors[ defaultCMF.binColorIndex ]),
    lidColor: loadColor(defaultCMF.colors[ defaultCMF.lidColorIndex ]),

    activeMenu: null,
    setActiveMenu: (menuState) => { 
        menuState !== get().activeMenu ?
        set({activeMenu: menuState}) :
        set({activeMenu: null}) 
    },  

    showHubCaps: defaultCMF.showHubCaps,
    toggleHubCaps: () => {set({showHubCaps: !get().showHubCaps})},

    canInteractWithModel: true,
    setInteractWithModel: (newState) => {set({canInteractWithModel: newState})},

    // Or set speed / dir?
    rotateServe: false,
    toggleRotateServe: () => {set({rotateServe: !get().rotateServe})},

    // Selects decals or unselects them
    setBinDecal: ( index ) => {
        (index !== get().binIndex && index !== null) ? 
        loadTexture( get().binDecals[ index ] ).then((result) => { set({binDecal: result, binIndex: index}) }) :
        set({binDecal: null, binIndex: null})
    },
    setLidDecal: ( index ) => {
        (index !== get().lidIndex && index !== null) ?
        loadTexture( get().lidDecals[ index ] ).then((result) => { set({lidDecal: result, lidIndex: index}) }) :
        set({lidDecal: null, lidIndex: null})
    },
    
    setFrontDecal: ( index ) => {
        (index !== get().frontIndex && index !== null) ? 
        loadTexture( get().generalDecals[ index ] ).then((result) => { set({frontDecal: result, frontIndex: index}) }) :
        set({frontDecal: null, frontIndex: null})
    },
    setRearTopDecal: ( index ) => {
        (index !== get().rearTopIndex && index !== null) ?
        loadTexture( get().generalDecals[ index ] ).then((result) => { set({rearTopDecal: result, rearTopIndex: index}) }) :
        set({rearTopDecal: null, rearTopIndex: null})
    },
    setRearBottomDecal: ( index ) => {
        (index !== get().rearBottomIndex && index !== null) ?
        loadTexture( get().generalDecals[ index ] ).then((result) => { set({rearBottomDecal: result, rearBottomIndex: index}) }) :
        set({rearBottomDecal: null, rearBottomIndex: null})
    },

    // Color selection
    setBinColor: ( index ) => {
        set({binColor: loadColor(get().colors[ index ]), binColorIndex: index})
    },

    setLidColor: ( index ) => {
        set({lidColor: loadColor(get().colors[ index ]), lidColorIndex: index})
    },

    // Set roughness
    // Set metal colours

    // Adds new decals
    addBinDecal: ( img ) => {
        let newDecals = get().binDecals;
        newDecals.push(img);
        set({binDecals: newDecals});
    },

    addLidDecal: ( img ) => {
        let newDecals = get().lidDecals;
        newDecals.push(img);
        set({lidDecals: newDecals});
    },

    addGeneralDecal: ( img ) => {
        let newDecals = get().generalDecals;
        newDecals.push(img);
        set({generalDecals: newDecals});
    },
}));

export default useStore