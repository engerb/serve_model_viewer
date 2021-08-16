import React, { Suspense, useState, useRef, Component, useEffect } from "react"
import { Canvas, useFrame, useThree, extend, useLoader } from 'react-three-fiber'
import { ACESFilmicToneMapping, sRGBEncoding } from "three"
import { OrbitControls, PerspectiveCamera, Stats, softShadows } from 'drei'
import Customizer from './Customizer'

import Serve from './Serve'
import Env from './Env'
import Lidar from './Lidar'
import Lighting from './Lighting'
import useStore from './Store'

export default (props) => {
    const activeMenu = useStore(state => state.activeMenu)
    const setActiveMenu = useStore(state => state.setActiveMenu)

    return (
        <div className={`modelViewer ${props.orbitControls ? '' : 'noTouchy'}`}>
            {props.customizer &&
                <div className='menuStateSelector'>
                    <div 
                        onClick={(e) => {e.stopPropagation(), setActiveMenu(('options'))}}
                        className = {`options ${activeMenu === 'options' ? 'active' : ''}`} />
                </div>
            }
            {(activeMenu === 'options') && 
                <Customizer menu = 'options' />
            }
            <Canvas
                gl={{ preserveDrawingBuffer: true }}
                invalidateFrameloop
                pixelRatio={window.devicePixelRatio}
                shadowMap
                concurrent
                gl={ props.powerEfficiencyMode ? { antialias: false, powerPreference: 'low-power' } : {}}
                onCreated={({ gl, scene }) => {
                    gl.toneMapping = ACESFilmicToneMapping
                    gl.outputEncoding = sRGBEncoding
                    if (props.bgColor) {
                        gl.setClearColor(props.bgColor)
                    }
                }}>
                {props.lidar &&
                    <Lidar rollScene={props.rollScene} rings={20} degrees={60} />
                }
                <fog attach="fog" args={[props.lidarOnly ? 'black' : 'white', props.lidarOnly ? 10 : 20, props.lidarOnly ? 20 : 30]} />
                <PerspectiveCamera 
                    makeDefault
                    position={props.rollScene ? [2.5, 1, 3.7] : [1.5, 1, 1.7]}
                    fov={45}
                    near={0.25}
                    far={30}
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
                {props.backgroundScene && 
                    <>  
                        {!props.lidarOnly &&
                            <>
                                <hemisphereLight skyColor={"blue"} groundColor={0xffffff} intensity={0.2} position={[0, 50, 0]} />
                                <directionalLight
                                    position={[8, 20, 8]}
                                    shadow-camera-left={-4}
                                    shadow-camera-bottom={-4}
                                    shadow-camera-right={16}
                                    shadow-camera-top={16}
                                    // shadow-camera-near={0.2}
                                    // shadow-camera-far={50}
                                    shadow-mapSize-height={1024}
                                    shadow-mapSize-width={1024}
                                    castShadow
                                />
                            </>
                        }

                        <Suspense fallback={null}>
                            <Env rollScene={props.rollScene} lidarOnly={props.lidarOnly} />
                        </Suspense>
                    </>
                }

                <Suspense fallback={null}>
                    <Serve rollScene={props.rollScene} customizer={props.customizer} />
                </Suspense>
                

                <Lighting />
                {props.stats &&
                    <Stats />
                }
            </Canvas>
        </div>
    )
}