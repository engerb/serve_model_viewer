import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Stats } from '@react-three/drei'
import useStore from './Store'

import Serve from './Serve'
import Customizer from './Customizer'

export default (props) => {
    const [setCurrent, scene, rendering] = useStore(state => [state.setCurrent, state.items.scene, state.rendering])

    return (
        <>
        <div className={`Scene`}>
            <Canvas style={{background: scene.color, width: scene.renderWidth, height: scene.renderHeight}} shadows concurrent gl={{ preserveDrawingBuffer: true }} frameloop dpr={[1, 2]} shadows camera={{ position: [1.5, 1, 1.7], fov: 45, near: 0.25, far: 20 }} >
                <Suspense fallback={null}>
                    <Serve />
                    <Environment preset='sunset' /> 
                </Suspense>
                <OrbitControls target={[0, 0.5, 0]} minDistance={1} maxDistance={5} enableDamping={true} dampingFactor={0.3} minPolarAngle={0.3} maxPolarAngle={1.7} />
                <hemisphereLight skyColor={'blue'} groundColor={0xffffff} intensity={0.2} position={[0, 50, 0]} />
                <directionalLight position={[8, 20, 8]} shadow-camera-left={-4} shadow-camera-bottom={-4} shadow-camera-right={16} shadow-camera-top={16} shadow-mapSize-height={1024} shadow-mapSize-width={1024} castShadow />
                {/* <Stats /> */}
            </Canvas>
        </div>
        <Customizer />
        </>
    )
}