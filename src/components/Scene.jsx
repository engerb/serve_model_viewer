import React, { Suspense } from "react";
import { Canvas, useFrame, useThree, extend, useLoader } from 'react-three-fiber'
import { OrbitControls, PerspectiveCamera } from 'drei'

import Model from '../assets/3d/Serve/Serve';

function Cube(props) {
    // This reference will give us direct access to the mesh
    const mesh = React.useRef()

    // Set up state for the hovered and active state
    const [hovered, setHover] = React.useState(false)
    const [active, setActive] = React.useState(false)

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={(e) => setActive(!active)}
            onPointerOver={(e) => setHover(true)}
            onPointerOut={(e) => setHover(false)}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

class Scene extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div className="modelViewer">
                <Canvas>
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
                    <React.Suspense fallback={null}>
                        <Model />
                    </React.Suspense>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    {/* <Cube position={[-1.2, 0, 0]} /> */}
                    {/* <Cube position={[1.2, 0, 0]} /> */}

                </Canvas>
            </div>
        );
    }
}

export default Scene;