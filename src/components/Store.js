import DefaultCMF from './DefaultCMF';
import create from 'zustand';

import { sRGBEncoding, TextureLoader, convertSRGBToLinear } from "three";

// create for setting colours too

// Can return the texture object or a promise wrap for it so that the state is only changed when ready
const loadTexture = (url, promise = true) => {
    if (promise) {
        return new Promise(resolve => {
            new TextureLoader().load(url, ( texture ) => {
                texture.flipY = false;
                texture.encoding = sRGBEncoding;
                resolve(texture);
            });
        });
    } else {
        return new TextureLoader().load(url, ( texture ) => {
            texture.flipY = false;
            texture.encoding = sRGBEncoding;
        });
    }
}

const [useStore, api] = create(set => ({
    hdri: require('../assets/3d/venice_sunset_1k.hdr').default,
    binDecalUrl: loadTexture(DefaultCMF.binDecals[ DefaultCMF.binDecals.findIndex(obj => obj.selected) ].img, false),
    lidDecalUrl: loadTexture(DefaultCMF.lidDecals[ DefaultCMF.lidDecals.findIndex(obj => obj.selected) ].img, false),
    frontDecalUrl: null,
    rearTopDecalUrl: null,
    rearBottomDecalUrl: null,
    binColor: DefaultCMF.colors[ DefaultCMF.colors.findIndex(obj => obj.selectedBin) ].color,
    lidColor: DefaultCMF.colors[ DefaultCMF.colors.findIndex(obj => obj.selectedLid) ].color,

    testMethodBin: () => loadTexture( DefaultCMF.binDecals[ 2 ].img ).then((result) => { set({binDecalUrl: result}) }),
    testMethodLid: () => loadTexture( DefaultCMF.lidDecals[ 2 ].img ).then((result) => { set({lidDecalUrl: result}) })
    // methods
    // stuff to store and add to DefaultCMF
}));

export default useStore