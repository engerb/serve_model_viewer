import React, { Suspense, useState, useRef, Component, useEffect } from "react";
import { Canvas, useFrame, useThree, extend, useLoader } from 'react-three-fiber'
import { ACESFilmicToneMapping, sRGBEncoding } from "three";
import { OrbitControls, PerspectiveCamera, Stats, softShadows } from 'drei'

import Serve from './Serve';
import Lighting from './Lighting'
import useStore from './Store';

// softShadows()

export default function Scene() {
    const setActiveMenu = useStore(state => state.setActiveMenu)

    return (
        <div className="modelViewer"
            // onClick={(e) => { 
            //     e.stopPropagation(); 
            //     // setActiveMenu('none');
            // }}
            >
                {/* <div 
                style={{width: '600px', height: '600px', position: 'absolute', backgroundColor: 'green', zIndex: '10000'}}
                onClick={(e) => { 
                        e.stopPropagation(); 
                        // setActiveMenu('none');
                    }}
                 ></div> */}
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
                {/* <directionalLight
                    castShadow
                    position={[2.5, 8, 5]}
                    intensity={1.5}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                /> */}
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
                <Stats />
            </Canvas>
        </div>
    )
}