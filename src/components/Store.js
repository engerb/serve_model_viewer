import create from 'zustand';
import { sRGBEncoding, TextureLoader } from 'three'
import { invalidate } from '@react-three/fiber'

const binDecals = ['bin_1.png', 'bin_2.png', 'bin_3.png', 'bin_4.svg', 'bin_5.png']
const lidDecals = ['lid_1.png', 'lid_2.png', 'lid_3.png', 'lid_4.png', 'lid_5.png']
const generalDecals = ['serve_logo_word_stacked.png', 'decal_cat.png', 'decal_mask.png', 'decal_mustache.png', 'decal_postmates.png', 'decal_smile.png']
const armBandDecals = ['engrave_maze.png', 'engrave_word.png']

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
    // background: 'black',
    // setBackground: (background) => {set({background: background})},
    binDecals: binDecals,
    lidDecals: lidDecals,
    generalDecals: generalDecals,
    armBandDecals: armBandDecals,
    showRenderGuides: false,
    setItem: (item) => {set({})}, // just used to force re-render
    loadTexture: (url) => {return loadTexture(url)},
    items: {
        wheels: {
            name: 'Wheels',
            showHubs: true,
            // wheelAngle: 0,
            // wheelSpeed: 0,
            wheelRotation: 0, 
            wheelAngle_slider: {
                name: 'Wheel angle',
                value: 0,
                range: [-30, 30],
                step: 0.01,
            },
            serveSpeed_slider: {
                name: 'Speed (Meters per second)',
                value: 0, 
                range: [-5, 5],
                step: 0.01,
            },
        },
        scene: {
            name: 'Scene',
            // serveAngle: 0,
            serveAngle_slider: {
                name: 'Serve angle',
                value: 0, 
                range: [0, 360],
                step: 1,
            },
            rotateServe: false,
            // squareRender: false,
            showShadow: true,
            // width_px: 1024,
            // height_px: 1024,
            width_render_px_slider: {
                name: 'Render width (px)',
                value: 1024, 
                range: [128, 4096],
                step: 128,
            },
            height_render_px_slider: {
                name: 'Render height (px)',
                value: 1024, 
                range: [128, 4096],
                step: 128,
            },
            // renderPNG_button: {

            // },
            // renderAnimation_button: {

            // },
            renderWidth: '100%',
            renderHeight: '100%',
            color: '#000000',
        },
        aluminum: {
            name: 'Aluminum',
            color: '#ded8dd',
        },
        lid: {
            name: 'Lid',
            color: '#ffffff',
            open: false,
            selectedIndex: 3,
            texture: loadTexture(lidDecals[3]),
            textures: lidDecals
        },
        bin: {
            name: 'Bin',
            color: '#ffffff',
            selectedIndex: 3,
            texture: loadTexture(binDecals[3]),
            textures: binDecals
        },
        front_decal: {
            name: 'Front decal',
            selectedIndex: null,
            texture: null,
            textures: generalDecals
        },
        rear_bottom_decal: {
            name: 'Rear bottom decal',
            selectedIndex: null,
            texture: null,
            textures: generalDecals
        },
        rear_top_decal: {
            name: 'Rear top decal',
            selectedIndex: null,
            texture: null,
            textures: generalDecals
        },
        side_arm_decal: {
            name: 'Side arm',
            // engraveDepth: -0.2,
            engraveDepth_slider: {
                name: 'Side arm depth',
                value: -0.2, 
                range: [-1, 1],
                step: 0.01,
            },
            selectedIndex: null,
            texture: null,
            textures: armBandDecals
        },
    },
}));

export default useStore