import create from 'zustand';
import { sRGBEncoding, TextureLoader } from 'three'
import { invalidate } from '@react-three/fiber'

const binDecals = ['/wraps/bin_1.png', '/wraps/bin_2.png', '/wraps/bin_3.png', '/wraps/bin_4.png', '/wraps/bin_5.png']
const lidDecals = ['/wraps/lid_1.png', '/wraps/lid_2.png', '/wraps/lid_3.png', '/wraps/lid_4.png', '/wraps/lid_5.png']
const generalDecals = ['/decals/decal_cat.png', '/decals/decal_mask.png', '/decals/decal_mustache.png', '/decals/decal_postmates.png', '/decals/decal_smile.png']
const armBandDecals = ['/engrave/engrave_maze.png', '/engrave/engrave_word.png']

const loadTexture = (url) => {
    if (!url) {
        invalidate()
        return null
    }

    return new TextureLoader().load(url, (texture) => {
        texture.flipY = false
        texture.encoding = sRGBEncoding
        invalidate()
        return texture
    },
    undefined,
    (error) => {
        console.error('An error happened: ', error)
        invalidate()
        return null
    })
}

const useStore = create((set, get) => ({
    current: null,
    setCurrent: (current) => {set({current: current})},
    background: 'black',
    setBackground: (background) => {set({background: background})},
    binDecals: binDecals,
    lidDecals: lidDecals,
    generalDecals: generalDecals,
    armBandDecals: armBandDecals,
    setItem: (item) => {set({})}, // just used to force re-render
    loadTexture: (url) => {return loadTexture(url)},
    items: {
        wheels: {
            name: 'Wheels',
            showHubs: true,
            showShadow: true,
            wheelAngle: 0,
            wheelSpeed: 0,
            serveAngle: 0,
        },
        aluminum: {
            name: 'Aluminum',
            color: '#ded8dd',
        },
        lid: {
            name: 'Lid',
            color: '#ffffff',
            open: false,
            selectedIndex: 0,
            texture: loadTexture(lidDecals[0]),
            textures: lidDecals
        },
        bin: {
            name: 'Bin',
            color: '#ffffff',
            texture: '/wraps/bin_1.png',
            selectedIndex: 0,
            texture: loadTexture(binDecals[0]),
            textures: binDecals
        },
        front_decal: {
            name: 'Front decal',
            texture: null,
            selectedIndex: null,
            textures: generalDecals
        },
        rear_bottom_decal: {
            name: 'Rear bottom decal',
            texture: null,
            selectedIndex: null,
            textures: generalDecals
        },
        rear_top_decal: {
            name: 'Rear top decal',
            texture: null,
            selectedIndex: null,
            textures: generalDecals
        },
        side_arm_decal: {
            name: 'Side arm',
            engraveDepth: -0.2,
            texture: null,
            selectedIndex: null,
            textures: armBandDecals
        },
    },
}));

export default useStore