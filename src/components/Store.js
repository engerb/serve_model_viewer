import DefaultCMF from './DefaultCMF';
import create from 'zustand';

import { sRGBEncoding, TextureLoader, convertSRGBToLinear } from "three";

// create for setting colours too

const loadTexture = (url) => {
    return new TextureLoader().load( url,
        ( texture ) => {
            texture.flipY = false;
            texture.encoding = sRGBEncoding;
        },
        undefined,
        ( err ) => {
            console.error( 'Loading lid wrap: An error happened.' );
        }
    );
}

const [useStore, api] = create(set => ({
    hdri: require('../assets/3d/venice_sunset_1k.hdr').default,
    binDecalUrl: loadTexture(DefaultCMF.binDecals[ DefaultCMF.binDecals.findIndex(obj => obj.selected) ].img),
    lidDecalUrl: loadTexture(DefaultCMF.lidDecals[ DefaultCMF.lidDecals.findIndex(obj => obj.selected) ].img),
    frontDecalUrl: null,
    rearTopDecalUrl: null,
    rearBottomDecalUrl: null,
    binColor: DefaultCMF.colors[ DefaultCMF.colors.findIndex(obj => obj.selectedBin) ].color,
    lidColor: DefaultCMF.colors[ DefaultCMF.colors.findIndex(obj => obj.selectedLid) ].color,

    // Create promise and set on resolve! This will also trigger a re-render!
    testMethodBin: () => set({binDecalUrl: loadTexture( DefaultCMF.binDecals[ 2 ].img )}),
    testMethodLid: () => set({lidDecalUrl: loadTexture( DefaultCMF.lidDecals[ 2 ].img )})
    // methods
    // stuff to store and add to DefaultCMF
}));

export default useStore