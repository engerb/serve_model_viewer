import React, { Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Stats, OrbitControls } from '@react-three/drei'

import Serve from './Serve'

export default function Scene(props) {
    return (
            <Canvas style={{background: 'black'}} shadows frameloop dpr={[1, 2]} shadows camera={{ position: [1.5, 1, 1.7], fov: 45, near: 0.25, far: 20 }}>
                <Suspense fallback={null}>
                    <Serve />
                    <Environment preset='sunset' /> 
                </Suspense>
                <OrbitControls target={[0, 0.5, 0]} minDistance={1} maxDistance={5} enableDamping={true} dampingFactor={0.3} minPolarAngle={0.3} maxPolarAngle={1.7} />
                <Stats />
            </Canvas>
    )
}