import React, { Suspense, useState, useRef, Component, useEffect } from "react";
import { Canvas, useFrame, useThree, extend, useLoader } from 'react-three-fiber'
import { ACESFilmicToneMapping, sRGBEncoding } from "three";
import { OrbitControls, PerspectiveCamera, Stats } from 'drei'

import Serve from './Serve';
import Lighting from './Lighting'

export default function Scene() {
    return (
        <div className="modelViewer">
            <Canvas
                gl={{ preserveDrawingBuffer: true }}
                invalidateFrameloop
                pixelRatio={window.devicePixelRatio}
                onCreated={({ gl }) => {
                    gl.toneMapping = ACESFilmicToneMapping
                    gl.outputEncoding = sRGBEncoding
                }}>
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
                />
                <Suspense fallback={null}>
                    <Serve />
                </Suspense>
                <Lighting />
                <Stats />
            </Canvas>
        </div>
    )
}