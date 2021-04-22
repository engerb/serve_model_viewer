import * as THREE from 'three'
import React, { useRef, useEffect, createRef } from 'react'
import { invalidate, useFrame, useThree } from 'react-three-fiber'
import { Box } from 'drei'

export default (props) => {
    const { gl, scene } = useThree()
    let lidarIndex = 0
    const defaultRings = 15
    const defaultDegrees = 20

    const points = useRef([])
    points.current = Array( (props.rings ? props.rings : defaultRings) * (props.degrees ? props.degrees : defaultDegrees) ).fill().map((_, i) => points.current[i] || createRef())

    useFrame(() => {
        if (props.rollScene) {
            lidarCast()
            invalidate()
        }
    })   

    // [0, 1, -0.3] // center of lidar
    // [0, 1.1, -0.29] // top of lidar

    const raycaster = new THREE.Raycaster()
    const origin = new THREE.Vector3(0, 1, -0.3)
    const angles = (() => {
        const sphere = new THREE.SphereBufferGeometry( 5, (props.degrees ? props.degrees : defaultDegrees) - 1, (props.rings ? props.rings : defaultRings) - 1 )
        const positions = sphere.attributes['position'].array
        const vertexCount = positions.length / 3
        let arr = []
        for (let i = 1; i <= vertexCount; i++) {
            arr.push(new THREE.Vector3(positions[i * 3], positions[i * 3 + 1] - 1, positions[i * 3 + 2]).normalize())
        }
        return arr
    })()


    const lidarCast = () => {
        if (points.current.length) {
            angles.map((angle, index)=>{
                raycaster.set( origin, angle )
                const intersects = raycaster.intersectObjects( scene.children, true )

                points.current[index].current.visible = false
                for ( let i = 0; i < intersects.length; i ++ ) {
                    if (intersects[i].distance > 1 && !intersects[i].object.lidarPoint) {
                        points.current[index].current.visible = true
                        points.current[index].current.position.x = intersects[i].point.x
                        points.current[index].current.position.y = intersects[i].point.y
                        points.current[index].current.position.z = intersects[i].point.z

                        break
                    }
                }
            })
        }
    }
    
    return (
        <>     
            {[...Array( props.rings ? props.rings : defaultRings ).keys()].map((ring) => { 
                return [...Array( props.degrees ? props.degrees : defaultDegrees ).keys()].map((deg) => { 
                    const currentIndex = lidarIndex;
                    lidarIndex++ // deg + (props.degrees ? props.degrees : 20) * (ring)
                    
                    return <Box lidarPoint visible={false} key={currentIndex} ref={points.current[currentIndex]} args={[0.01, 0.01, 0.01]} position={[0, 1.1, -0.29]}>
                        <meshBasicMaterial attach="material" color="hotpink" />
                    </Box>
                })
            })}
        </>
    )
}