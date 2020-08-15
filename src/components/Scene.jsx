import React, { Suspense, useState, useRef, Component, useEffect } from "react";
import { Canvas, useFrame, useThree, extend, useLoader } from 'react-three-fiber'
import { ACESFilmicToneMapping, sRGBEncoding } from "three";
import { OrbitControls, PerspectiveCamera, Stats } from 'drei'

import Model from '../assets/3d/Serve/Serve';
import Lighting from './Lighting';

class Scene extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            hdri: require('../assets/3d/venice_sunset_1k.hdr').default
        }
    }

    render() {
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
                        <Model />
                    </Suspense>
                    <Lighting image={this.state.hdri}/>
                    <Stats />
                </Canvas>
            </div>
        );
    }
}

export default Scene;