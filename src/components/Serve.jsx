/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

// import * as THREE from 'three'
import React, { useRef, useState, useEffect, Children } from 'react'
import { useLoader, useFrame, useThree, invalidate } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { sRGBEncoding, TextureLoader, convertSRGBToLinear, FrontSide, MeshBasicMaterial } from "three";
import { draco, Html } from 'drei'

import Customizer from './Customizer' // optional, only needed if props.customize
import useStore from './Store';

// softShadows()

export default function Serve(props) {
  const group = useRef();
  const { nodes, materials } = useLoader(GLTFLoader, require('../assets/3d/Serve/serve.glb').default, draco('/draco-gltf/'))

  // Colors / textures
  const binDecal = useStore(state => state.binDecal)
  const lidDecal = useStore(state => state.lidDecal)
  const frontDecal = useStore(state => state.frontDecal)
  const rearTopDecal = useStore(state => state.rearTopDecal)
  const rearBottomDecal = useStore(state => state.rearBottomDecal)
  const binColor = useStore(state => state.binColor)
  const lidColor = useStore(state => state.lidColor)
  const binRoughness = useStore(state => state.binRoughness)
  const lidRoughness = useStore(state => state.lidRoughness)
  const showHubCaps = useStore(state => state.showHubCaps)

  const activeMenu = useStore(state => state.activeMenu)

  const rotateServe = useStore(state => state.rotateServe)

  // Methods
  // const setBinDecal = useStore(state => state.setBinDecal)
  // const setLidDecal = useStore(state => state.setLidDecal)
  const setActiveMenu = useStore(state => state.setActiveMenu)
  const toggleHubCaps = useStore(state => state.toggleHubCaps)

  // Set up local state for the hovered and active
  const [binHover, setBinHover] = useState(false)
  const [lidHover, setLidHover] = useState(false)
  const [frontHover, setFrontHover] = useState(false)
  const [rearTopHover, setRearTopHover] = useState(false)
  const [rearBottomHover, setRearBottomHover] = useState(false)
  const [hubCapHover, setHubCapHover] = useState(false)
  // const [rotate, setRotate] = useState(false)
  const hoverColor = 0x222222;

  useFrame(() => {
    if (rotateServe) {
      // group.current.rotation.x = group.current.rotation.y += 0.01;
      group.current.rotation.y += 0.01;
      invalidate();
    }
  })

  return (
    <group 
      ref={group}
      // onClick={(e) => setActive(!active)}
      // onPointerOver={(e) => setHover(true)}
      // onPointerOut={(e) => setHover(false)}
      // {...props}
      dispose={null} >
      <group position={[0, 0.26, 0]}>
        {/* {props.Customizer && 
          <Html 
            // position={[0.30, -0.11, 0.23]} // front left
            position={[-0.30, -0.11, 0.23]} // front right
            // position={[0.30, -0.11, -0.23]} // rear left
            // position={[-0.30, -0.11, -0.23]} // front left
            >
            <div style={{width: '10px', height: '10px', backgroundColor: "red"}} />
          </Html>
        } */}
        <group position={[0.16, 0, 0]}>
          <group position={[0.02, -0.11, 0.23]}>
            <mesh
              
              onPointerOver={(e) => {e.stopPropagation(); setHubCapHover(true)}}
              onPointerOut={(e) => {e.stopPropagation(); setHubCapHover(false)}}
              onClick={(e) => { 
                e.stopPropagation(); 
                setActiveMenu('hubCaps');
                toggleHubCaps()
              }}
              material={materials.mat_aluminum}
              material-emissive={hubCapHover ? hoverColor : 0x000000}
              material-opacity={showHubCaps ? 1 : (hubCapHover ? 0.6 : 0)}
              material-transparent={true}
              material-side={FrontSide} material-aoMapIntensity={1.5} material-color={0xe8c6e1} material-roughnessMap={materials.tex_cloud_ref.map} geometry={nodes.cap_fl.geometry} />
            <mesh
               
              onPointerOver={(e) => {e.stopPropagation()}}
              onPointerOut={(e) => {e.stopPropagation()}}
              onClick={(e) => {e.stopPropagation()} }
              material={materials.mat_metal_black_smooth} material-side={FrontSide} material-color={0x1D1D1D} material-roughnessMap={materials.tex_cloud_ref.map} geometry={nodes.hub_fl.geometry} />
            <mesh
              
              onPointerOver={(e) => {e.stopPropagation()}}
              onPointerOut={(e) => {e.stopPropagation()}}
              onClick={(e) => {e.stopPropagation()} } 
              material={materials.mat_tire} material-side={FrontSide} material-color={0x111111} material-aoMapIntensity={0.5} material-normalScale={[-2, -2]} material-roughnessMap={materials.tex_cloud_ref.map} geometry={nodes.tire_fl.geometry} />
          </group>
          <group position={[0.02, -0.11, -0.23]}>
            <mesh
               
              onPointerOver={(e) => {e.stopPropagation(); setHubCapHover(true)}}
              onPointerOut={(e) => {e.stopPropagation(); setHubCapHover(false)}}
              onClick={(e) => { 
                e.stopPropagation(); 
                setActiveMenu('hubCaps');
                toggleHubCaps()
              }}
              material={materials.mat_aluminum} geometry={nodes.cap_rl.geometry} />
            <mesh
               
              onPointerOver={(e) => {e.stopPropagation()}}
              onPointerOut={(e) => {e.stopPropagation()}}
              onClick={(e) => {e.stopPropagation()} }
              material={materials.mat_metal_black_smooth} geometry={nodes.hub_rl.geometry} />
            <mesh
               
              onPointerOver={(e) => {e.stopPropagation()}}
              onPointerOut={(e) => {e.stopPropagation()}}
              onClick={(e) => {e.stopPropagation()} }
              material={materials.mat_tire} geometry={nodes.tire_rl.geometry} />
          </group>
          <mesh
            
            onPointerOver={(e) => {e.stopPropagation()}}
            onPointerOut={(e) => {e.stopPropagation()}}
            onClick={(e) => {e.stopPropagation()} }
            material={materials.mat_metal_black_smooth}
            material-side={FrontSide}
            geometry={nodes.boggy_arm_l.geometry}
            position={[-0.16, -0.26, 0]}
          />
        </group>
        <group position={[-0.16, 0, 0]}>
          <group position={[-0.02, -0.11, 0.23]}>
            <mesh
               
              onPointerOver={(e) => {e.stopPropagation(); setHubCapHover(true)}}
              onPointerOut={(e) => {e.stopPropagation(); setHubCapHover(false)}}
              onClick={(e) => { 
                e.stopPropagation(); 
                setActiveMenu('hubCaps');
                toggleHubCaps()
              }}
              material={materials.mat_aluminum} geometry={nodes.cap_fr.geometry} />
            <mesh
              meshProps
              material={materials.mat_metal_black_smooth} geometry={nodes.hub_fr.geometry} />
            <mesh
              
              onPointerOver={(e) => {e.stopPropagation()}}
              onPointerOut={(e) => {e.stopPropagation()}}
              onClick={(e) => {e.stopPropagation()} }
              material={materials.mat_tire} geometry={nodes.tire_fr.geometry} />
          </group>
          <group position={[-0.02, -0.11, -0.23]}>
            <mesh
               
              onPointerOver={(e) => {e.stopPropagation(); setHubCapHover(true)}}
              onPointerOut={(e) => {e.stopPropagation(); setHubCapHover(false)}}
              onClick={(e) => { 
                e.stopPropagation(); 
                setActiveMenu('hubCaps');
                toggleHubCaps()
              }} 
              material={materials.mat_aluminum} geometry={nodes.cap_rr.geometry} />
            <mesh
              
              onPointerOver={(e) => {e.stopPropagation()}}
              onPointerOut={(e) => {e.stopPropagation()}}
              onClick={(e) => {e.stopPropagation()} }
              material={materials.mat_metal_black_smooth} geometry={nodes.hub_rr.geometry} />
            <mesh
              
              onPointerOver={(e) => {e.stopPropagation()}}
              onPointerOut={(e) => {e.stopPropagation()}}
              onClick={(e) => {e.stopPropagation()} }
              material={materials.mat_tire} geometry={nodes.tire_rr.geometry} />
            
          </group>
          <mesh
            
            onPointerOver={(e) => {e.stopPropagation()}}
            onPointerOut={(e) => {e.stopPropagation()}}
            onClick={(e) => {e.stopPropagation()} }
            material={materials.mat_metal_black_smooth}
            geometry={nodes.boggy_arm_r.geometry}
            position={[0.16, -0.26, 0]}
          />
        </group>
        <group position={[0, 0.55, -0.33]}>
          {(props.Customizer && activeMenu === 'lid') && 
            <Html 
              position={[0, -0.02, 0.55]}
              >
              <Customizer menu = 'lid' />
              {/* <div style={{width: '10px', height: '10px', backgroundColor: "red"}} /> */}
            </Html>
          }
          <mesh
            
            onPointerOver={(e) => {e.stopPropagation()}}
            onPointerOut={(e) => {e.stopPropagation()}}
            onClick={(e) => {e.stopPropagation()} }
            material={materials.mat_plastic_white}
            material-side={FrontSide}
            material-color={0xEEEEEE}
            material-roughnessMap={materials.tex_cloud_ref.map}
            geometry={nodes.lid_inside.geometry}
            position={[0, -0.81, 0.33]}
          />
          <mesh
            
            onPointerOver={(e) => {e.stopPropagation()}}
            onPointerOut={(e) => {e.stopPropagation()}}
            onClick={(e) => {e.stopPropagation()} }
            material={materials.mat_plastic_black}
            material-color={0x111111}
            material-roughnessMap={materials.tex_cloud_ref.map}
            geometry={nodes.lid_liner.geometry}
            position={[0, -0.81, 0.33]}
          />
          <mesh
             
            onPointerOver={(e) => {e.stopPropagation()}}
            onPointerOut={(e) => {e.stopPropagation()}}
            onClick={(e) => {e.stopPropagation()} }
            material={materials.mat_strip_eyes} material-side={FrontSide} material-color={0xACACAC} material-roughnessMap={materials.tex_cloud_ref.map} geometry={nodes.strip.geometry} position={[0, -0.81, 0.33]} />
          <mesh
            onUpdate={self => self.material.needsUpdate = true}
            geometry={nodes.lid_top.geometry} 
            material={materials.mat_lid_vinyl}
            material-side={FrontSide}
            material-roughness={lidRoughness}
            material-roughnessMap={materials.tex_cloud_ref.map}
            material-map={lidDecal}
            material-opacity={lidDecal ? 1 : 0}
            material-transparent={true}
            material-emissive={lidHover ? hoverColor : 0x000000}
            position={[0, -0.81, 0.33]} />
          <mesh
             
            geometry={nodes.lid_top.geometry} 
            material={materials.mat_lid_base}
            material-side={FrontSide}
            material-color={lidColor}
            material-roughnessMap={materials.tex_cloud_ref.map}
            material-emissive={lidHover ? hoverColor : 0x000000}

            onPointerOver={(e) => {e.stopPropagation(); setLidHover(true)}}
            onPointerOut={(e) => {e.stopPropagation(); setLidHover(false)}}
            onClick={(e) => {e.stopPropagation(); setActiveMenu('lid')} }

            position={[0, -0.81, 0.33]} />
          </group>
        <mesh
          
          onPointerOver={(e) => {e.stopPropagation()}}
          onPointerOut={(e) => {e.stopPropagation()}}
          onClick={(e) => {e.stopPropagation()} } 
          // material={materials.mat_aluminum} 
          geometry={nodes.aluminum.geometry} position={[0, -0.26, 0]}>
            <meshPhysicalMaterial 
              attach='material' 
              clone={materials.mat_aluminum}
              metalness={materials.mat_aluminum.metalness}
              side={FrontSide} 
              color={0xe8c6e1} 
              roughness={materials.mat_aluminum.roughness} 
              aoMapIntensity={1.5} 
              aoMap={materials.mat_aluminum.aoMap} 
              roughnessMap={materials.tex_cloud_ref.map} 
              clearcoat={materials.mat_aluminum.clearcoat}
              clearcoatRoughness={materials.mat_aluminum.clearcoatRoughness}
              />
        </mesh>
        {(props.Customizer && activeMenu === 'bin') && 
          <Html 
            position={[.23, .43, 0]} // left
            // position={[-.23, .43, 0]} // right
            >
            <Customizer menu = 'bin' />
            {/* <div style={{width: '10px', height: '10px', backgroundColor: "red"}} /> */}
          </Html>
        }
        <mesh
          onUpdate={self => self.material.needsUpdate = true}
          geometry={nodes.bin.geometry} 
          material={materials.mat_bin_vinyl}
          material-side={FrontSide}
          material-roughness={binRoughness}
          material-roughnessMap={materials.tex_cloud_ref.map}
          material-opacity={binDecal ? 1 : 0}
          material-map={binDecal}
          material-transparent={true}
          material-emissive={binHover ? hoverColor : 0x000000}
          position={[0, -0.26, 0]} />
        <mesh
            
          geometry={nodes.bin.geometry} 
          material={materials.mat_bin_base}
          material-side={FrontSide}
          material-color={binColor}
          material-roughnessMap={materials.tex_cloud_ref.map}
          material-emissive={binHover ? hoverColor : 0x000000}

          onPointerOver={(e) => {e.stopPropagation(); setBinHover(true)}}
          onPointerOut={(e) => {e.stopPropagation(); setBinHover(false)}}
          onClick={(e) => {e.stopPropagation(); setActiveMenu('bin')} }

          position={[0, -0.26, 0]} />

        <mesh
            
          onPointerOver={(e) => {e.stopPropagation()}}
          onPointerOut={(e) => {e.stopPropagation()}}
          onClick={(e) => {e.stopPropagation()} }
          material={materials.mat_lense} material-side={FrontSide} material-color={0x0A0716} geometry={nodes.black_glass.geometry} position={[0, -0.26, 0]} />
        <mesh
            
          onPointerOver={(e) => {e.stopPropagation()}}
          onPointerOut={(e) => {e.stopPropagation()}}
          onClick={(e) => {e.stopPropagation()} }
          material={materials.mat_plastic_black} geometry={nodes.black_plastic.geometry} position={[0, -0.26, 0]} />
        <mesh
           
          onPointerOver={(e) => {e.stopPropagation()}}
          onPointerOut={(e) => {e.stopPropagation()}}
          onClick={(e) => {e.stopPropagation()} }
          material={materials.mat_plastic_black}
          geometry={nodes.black_plastic_base.geometry}
          position={[0, -0.26, 0]}
        />
        <mesh
            
          onPointerOver={(e) => {e.stopPropagation()}}
          onPointerOut={(e) => {e.stopPropagation()}}
          onClick={(e) => {e.stopPropagation()} }
          material={materials.mat_light_blocker} material-side={FrontSide} material-color={0x111111} geometry={nodes.blocker.geometry} position={[0, -0.26, 0]} />
        <mesh
            
          onPointerOver={(e) => {e.stopPropagation()}}
          onPointerOut={(e) => {e.stopPropagation()}}
          onClick={(e) => {e.stopPropagation()} }
          material={materials.mat_strip_eyes} geometry={nodes.eye_lense.geometry} position={[0, -0.26, 0]} />
        <mesh
            
          onPointerOver={(e) => {e.stopPropagation()}}
          onPointerOut={(e) => {e.stopPropagation()}}
          onClick={(e) => {e.stopPropagation()} }
          material={materials.mat_metal_black_rough} material-side={FrontSide} material-color={0x1D1D1D} material-roughnessMap={materials.tex_cloud_ref.map} geometry={nodes.eye_plate.geometry} position={[0, -0.26, 0]} />
        <mesh
            
          onPointerOver={(e) => {e.stopPropagation()}}
          onPointerOut={(e) => {e.stopPropagation()}}
          onClick={(e) => {e.stopPropagation()} }
          material={materials.mat_plastic_white} material-roughnessMap={materials.tex_cloud_ref.map} geometry={nodes.liner.geometry} position={[0, -0.26, 0]} />
        <mesh
            
          onPointerOver={(e) => {e.stopPropagation()}}
          onPointerOut={(e) => {e.stopPropagation()}}
          onClick={(e) => {e.stopPropagation()} }
          material={materials.mat_screen} material-side={FrontSide} material-color={0x0A0716} material-roughnessMap={materials.tex_cloud_ref.map} geometry={nodes.screen.geometry} position={[0, -0.26, 0]} />
        <mesh
            
          onPointerOver={(e) => {e.stopPropagation()}}
          onPointerOut={(e) => {e.stopPropagation()}}
          onClick={(e) => {e.stopPropagation()} }
          material={materials.mat_tail_lights} material-side={FrontSide} material-color={0x9F1313} material-roughnessMap={materials.tex_cloud_ref.map} geometry={nodes.tail_lights.geometry} position={[0, -0.26, 0]} />

        <mesh
            
          onPointerOver={(e) => {e.stopPropagation(); setFrontHover(true)}}
          onPointerOut={(e) => {e.stopPropagation(); setFrontHover(false)}}
          onClick={(e) => {e.stopPropagation(); setActiveMenu('frontDecal')} }
          onUpdate={self => self.material.needsUpdate = true}
          material={materials.mat_front_decal} material-color={0xFFFFFF} material-emissive={frontHover ? hoverColor : 0x000000} material-opacity={frontDecal ? 1 : (frontHover ? 0.6 : 0)} material-map={frontDecal} material-transparent={true} material-roughnessMap={materials.tex_cloud_ref.map} material-side={FrontSide} geometry={nodes.front_decal.geometry} position={[0, -0.26, 0]} />
        {(props.Customizer && activeMenu === 'frontDecal') && 
          <Html 
            position={[0, 0.2, 0.3]}
            prepend
            onPointerOver={(e) => {e.stopPropagation()}}
            onPointerOut={(e) => {e.stopPropagation()}}
            onClick={(e) => {e.stopPropagation()} }
            >
            <Customizer menu = 'frontDecal' />
            {/* <div style={{width: '10px', height: '10px', backgroundColor: "red"}} /> */}
          </Html>
        }
        <mesh
          onPointerOver={(e) => {e.stopPropagation(); setRearTopHover(true)}}
          onPointerOut={(e) => {e.stopPropagation(); setRearTopHover(false)}}
          onClick={(e) => {e.stopPropagation(); setActiveMenu('rearTopDecal')} }
          onUpdate={self => self.material.needsUpdate = true}
          material={materials.mat_rear_top_decal} material-color={0xFFFFFF} material-emissive={rearTopHover ? hoverColor : 0x000000} material-opacity={rearTopDecal ? 1 : (rearTopHover ? 0.6 : 0)} material-map={rearTopDecal} material-transparent={true} material-roughnessMap={materials.tex_cloud_ref.map} material-side={FrontSide} geometry={nodes.rear_top_decal.geometry} position={[0, -0.26, 0]} />
        {(props.Customizer && activeMenu === 'rearTopDecal') && 
          <Html 
            position={[0, 0.55, -0.32]}
            >
            <Customizer menu = 'rearTopDecal' />
            {/* <div style={{width: '10px', height: '10px', backgroundColor: "red"}} /> */}
          </Html>
        }
        <mesh
          onPointerOver={(e) => {e.stopPropagation(); setRearBottomHover(true)}}
          onPointerOut={(e) => {e.stopPropagation(); setRearBottomHover(false)}}
          onClick={(e) => {e.stopPropagation(); setActiveMenu('rearBottomDecal')} }
          onUpdate={self => self.material.needsUpdate = true}
          material={materials.mat_rear_bottom_decal} material-color={0xFFFFFF} material-emissive={rearBottomHover ? hoverColor : 0x000000} material-opacity={rearBottomDecal ? 1 : (rearBottomHover ? 0.6 : 0)} material-map={rearBottomDecal} material-transparent={true} material-roughnessMap={materials.tex_cloud_ref.map} material-side={FrontSide} geometry={nodes.rear_bottom_decal.geometry} position={[0, -0.26, 0]} />
        {(props.Customizer && activeMenu === 'rearBottomDecal') && 
          <Html 
            position={[0, 0.21, -0.28]}
            >
            <Customizer menu = 'rearBottomDecal' />
            {/* <div style={{width: '10px', height: '10px', backgroundColor: "red"}} /> */}
          </Html>
        }
      </group>
      <mesh 
        // onPointerOver={(e) => {e.stopPropagation()}}
        // onPointerOut={(e) => {e.stopPropagation()}}
        // onClick={(e) => {e.stopPropagation(); setRotate(!rotate); }}
        material={materials.mat_floor} material-side={FrontSide} material-color={0x000000} material-alphaMap={materials.tex_floor_ref.map} geometry={nodes.floor.geometry} />
    </group>
  )
}
