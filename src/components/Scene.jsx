import React from "react";
import { Canvas, useFrame } from 'react-three-fiber'

function Box(props) {
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
                {/* <div className={`modelViewer ${this.state.visible}`} ref={ref => (this.mount = ref)} />  */}
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Box position={[-1.2, 0, 0]} />
                    <Box position={[1.2, 0, 0]} />
                </Canvas>
            </div>
        );
    }
}

export default Scene;