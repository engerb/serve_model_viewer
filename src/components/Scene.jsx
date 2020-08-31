import React, { Suspense, useState, useRef, Component, useEffect } from "react";
import { Canvas, useFrame, useThree, extend, useLoader } from 'react-three-fiber'
import { ACESFilmicToneMapping, sRGBEncoding } from "three";
import { OrbitControls, PerspectiveCamera, Stats, softShadows } from 'drei'
import Customizer from './Customizer'

import Serve from './Serve';
import Lighting from './Lighting'
import useStore from './Store';

export default function Scene() {
    const activeMenu = useStore(state => state.activeMenu)
    const setActiveMenu = useStore(state => state.setActiveMenu)

    return (
        <div className="modelViewer">
            <div className='menuStateSelector'>
                <div 
                    onClick={(e) => {e.stopPropagation(), setActiveMenu(('options'))}}
                    className = {`options ${activeMenu === 'options' ? 'active' : ''}`} />
            </div>
            {(activeMenu === 'options') && 
                <Customizer menu = 'options' />
            }
            <Canvas
                gl={{ preserveDrawingBuffer: true }}
                invalidateFrameloop
                pixelRatio={window.devicePixelRatio}
                shadowMap
                onCreated={({ gl }) => {
                    gl.toneMapping = ACESFilmicToneMapping
                    gl.outputEncoding = sRGBEncoding
                }}>
                <fog attach="fog" args={["white", 0, 40]} />
                <PerspectiveCamera 
                    makeDefault
                    position={[1.5, 1, 1.7]}
                    fov={45}
                    near={0.25}
                    far={20}
                />
                <OrbitControls
                    target={[0, 0.5, 0]}
                    minDistance={1}
                    maxDistance={5}
                    enableDamping={true}
                    dampingFactor={0.3}
                    minPolarAngle={0.3}
                    maxPolarAngle={1.7}
                    onChange={() => {console.log("hello")}}
                />
                <Suspense fallback={null}>
                    <Serve Customizer = {true} />
                </Suspense>
                <Lighting />
                {/* <Stats /> */}
            </Canvas>
        </div>
    )
}