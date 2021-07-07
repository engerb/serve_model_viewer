import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Math } from 'three'
import useStore from './Store' 


export default (props) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('serve.glb')
  const [setCurrent, items, setItem] = useStore(state => [state.setCurrent, state.items, state.setItem])
  
  const [hovered, setHovered] = useState(null)
  useEffect(() => {
    const cursor = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="30" width="59" height="19" rx="2" fill="black"/>  
      <text fill="white" style="white-space:pre" dominant-baseline="middle" text-anchor="middle" font-weight="bold" font-family="Montserrat, sans-serif" font-size="11" letter-spacing="-.01em"><tspan x="53%" y="41">${hovered && items[hovered].name}</tspan></text>
      <path opacity="0.2" d="M26.8258 21.451L16.4335 27.451C15.9139 27.751 15.3675 27.6046 15.0675 27.085C14.3175 25.786 13.2613 25.3565 11.6086 24.6941C10.739 24.3879 9.6828 23.9585 8.52658 23.3558C5.38114 21.7078 2.10889 19.4401 1.11248 18.5142C0.116071 17.5884 -0.0741217 16.659 0.0222885 16.026C0.0686986 15.3063 0.611518 14.6465 1.39094 14.1965C2.43017 13.5965 3.9694 13.8626 5.57203 14.4384L0.422031 5.51834C-0.427969 4.04609 0.0478632 2.27026 1.52011 1.42026C2.99235 0.570261 4.76818 1.04609 5.61818 2.51834L7.71818 6.15564C7.92799 5.91904 8.1378 5.68244 8.48421 5.48244C9.43684 4.93244 10.5163 5.00205 11.3493 5.44487C11.5457 4.98507 11.9287 4.64847 12.3617 4.39847C13.5741 3.69847 14.9768 3.92789 15.9732 4.85372C16.183 4.61712 16.4794 4.33052 16.8258 4.13052C18.2981 3.28052 20.0739 3.75635 20.9239 5.22859L22.4239 7.82667C23.7239 10.0783 24.3409 12.147 24.9079 14.129C25.4748 16.1111 25.9918 18.0065 27.1918 20.085C27.4918 20.6046 27.3454 21.151 26.8258 21.451Z" fill="black"/>
      <path opacity="0.3" d="M22 10.5C24.1467 14.5355 23.5 16 26 21.5L16 27.5L13.5 25C12.3333 24.5 7 22.5 7 22.5L1.40808 18.5058C0.597393 17.9267 0.328147 16.8437 0.773687 15.9526C1.19806 15.1039 2.13182 14.7381 2.97895 15.1658C4.1363 15.75 5.5 16.5 5.5 16.5C5.5 16.5 8.33333 18.3333 9 19L0.883403 5.47234C0.38886 4.6481 0.628869 3.58075 1.42865 3.04757C2.28412 2.47725 3.44266 2.73777 3.97164 3.6194L9 12L7.81796 9.3404C7.36799 8.32797 7.8328 7.14309 8.85114 6.70665C9.7878 6.30523 10.8763 6.67735 11.3712 7.56816L13 10.5L11.7584 7.70642C11.3519 6.79182 11.822 5.72599 12.7715 5.40949C13.4968 5.16772 14.2942 5.44131 14.7183 6.07744L17 9.5L16.2118 7.39812C15.843 6.41477 16.4637 5.33939 17.4996 5.16673C18.1142 5.0643 18.7342 5.31333 19.0899 5.8249C19.8644 6.93877 21.1034 8.81442 22 10.5Z" fill="black"/>
      <path d="M22.5 9C24.6467 13.0355 24 14.5 26.5 20L16.5 26L14 23.5C12.8333 23 7.5 21 7.5 21L1.90808 17.0058C1.09739 16.4267 0.828147 15.3437 1.27369 14.4526C1.69806 13.6039 2.63182 13.2381 3.47895 13.6658C4.6363 14.25 6 15 6 15C6 15 8.83333 16.8333 9.5 17.5L1.3834 3.97234C0.88886 3.1481 1.12887 2.08075 1.92865 1.54757C2.78412 0.977251 3.94266 1.23777 4.47164 2.1194L9.5 10.5L8.31796 7.8404C7.86799 6.82797 8.3328 5.64309 9.35114 5.20665C10.2878 4.80523 11.3763 5.17735 11.8712 6.06816L13.5 9L12.2584 6.20642C11.8519 5.29182 12.322 4.22599 13.2715 3.90949C13.9968 3.66772 14.7942 3.94131 15.2183 4.57744L17.5 8L16.7118 5.89812C16.343 4.91477 16.9637 3.83939 17.9996 3.66673C18.6142 3.5643 19.2342 3.81333 19.5899 4.3249C20.3644 5.43877 21.6034 7.31442 22.5 9Z" fill="white" stroke="black" stroke-linejoin="round"/>
    </svg>`
    const auto = `<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.3" d="M3.5 25.5L0.5 2L19.5 16.5L10 18.5L3.5 25.5Z" fill="black"/>
      <path d="M10.397 17.0107L10.2416 17.0434L10.1336 17.1598L4.36067 23.3768L1.64743 2.12306L18.8293 15.2355L10.397 17.0107Z" fill="black" stroke="white"/>
    </svg>`
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
  }, [hovered])

  useFrame((state, delta) => {
    if (items.scene.rotateServe) {
      items.scene.serveAngle_slider.value = (items.scene.serveAngle_slider.value + 0.01) % 6.28319 // 360rad
      setItem()
      // invalidate()
    }

    // if (items.scene.wheelSpeed > 0) {
    //   // wheel_fl.current.rotation.x += items.scene.wheelSpeed
    //   wheelRotation = (wheelRotation + 0.01) % 6.28319 // 360rad
    //   console.log(wheelRotation)
    //   // wheel_rl.current.rotation.x += items.scene.wheelSpeed
    //   // wheel_fr.current.rotation.x += items.scene.wheelSpeed
    //   // wheel_rr.current.rotation.x += items.scene.wheelSpeed
    //   setItem()
    // }
  })
  
  return (
    <group rotation-y={items.scene.serveAngle_slider.value} ref={group} {...props} dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), e.object.name ? setHovered(e.object.name) : setHovered(null))}
      onPointerOut={(e) => e.intersections.length === 0 && setHovered(null)}
      onPointerMissed={() => (setCurrent(null))}
      onPointerDown={(e) => (e.stopPropagation(), e.object.name ? (setCurrent(e.object.name)) : setCurrent(null))}>
      <group position={[0, 0.26, 0]}>
        <group position={[0.16, 0, 0]}>
          <group rotation-x={items.wheels.wheelRotation} rotation-y={items.wheels.wheelAngle_slider.value} position={[0.02, -0.11, 0.23]}>
            {items.wheels.showHubs && <mesh name={'wheels'} geometry={nodes.cap_fl.geometry} material={nodes.cap_fl.material} material-transparent={true} material-aoMapIntensity={1.5} material-roughnessMap={materials.tex_cloud_ref.map} />}
            <mesh name={'wheels'} geometry={nodes.hub_fl.geometry} material-color={0x1D1D1D} material-roughnessMap={materials.tex_cloud_ref.map} material={nodes.hub_fl.material} />
            <mesh name={'wheels'} geometry={nodes.tire_fl.geometry} material={nodes.tire_fl.material} material-color={0x333333} material-aoMapIntensity={0.5} material-normalScale={[-2, -2]} material-roughnessMap={materials.tex_cloud_ref.map} />
          </group>
          <group rotation-x={items.wheels.wheelRotation} position={[0.02, -0.11, -0.23]}>
            {items.wheels.showHubs && <mesh name={'wheels'} geometry={nodes.cap_rl.geometry} material={nodes.cap_rl.material} />}
            <mesh name={'wheels'} geometry={nodes.hub_rl.geometry} material={nodes.hub_rl.material} />
            <mesh name={'wheels'} geometry={nodes.tire_rl.geometry} material={nodes.tire_rl.material} />
          </group>
          <mesh geometry={nodes.boggy_arm_l.geometry} material-color={0x444444} material={nodes.boggy_arm_l.material} position={[-0.16, -0.26, 0]} />
        </group>
        <group position={[-0.16, 0, 0]}>
          <group rotation-x={items.wheels.wheelRotation} rotation-y={items.wheels.wheelAngle_slider.value} position={[-0.02, -0.11, 0.23]}>
            {items.wheels.showHubs && <mesh name={'wheels'} geometry={nodes.cap_fr.geometry} material={nodes.cap_fr.material} />}
            <mesh name={'wheels'} geometry={nodes.hub_fr.geometry} material={nodes.hub_fr.material} />
            <mesh name={'wheels'} geometry={nodes.tire_fr.geometry} material={nodes.tire_fr.material} />
          </group>
          <group rotation-x={items.wheels.wheelRotation} position={[-0.02, -0.11, -0.23]}>
            {items.wheels.showHubs && <mesh name={'wheels'} geometry={nodes.cap_rr.geometry} material={nodes.cap_rr.material} />}
            <mesh name={'wheels'} geometry={nodes.hub_rr.geometry} material={nodes.hub_rr.material} />
            <mesh name={'wheels'} geometry={nodes.tire_rr.geometry} material={nodes.tire_rr.material} />
          </group>
          <mesh geometry={nodes.boggy_arm_r.geometry} material={nodes.boggy_arm_r.material} position={[0.16, -0.26, 0]} />
        </group>
        <group rotation-x={items.lid.open ? -0.9 : 0} position={[0, 0.55, -0.33]}>
          {/* Lid */}
          <mesh name={'lid'} geometry={nodes.lid_top.geometry} material={materials.mat_lid_vinyl} position={[0, -0.81, 0.33]} material-roughness={0.5} material-roughnessMap={materials.tex_cloud_ref.map} material-transparent={true} material-map={items.lid.texture} material-opacity={items.lid.texture ? 1 : 0} onUpdate={self => self.material.needsUpdate = true} />
          <mesh geometry={nodes.lid_top.geometry} material={materials.mat_lid_base} position={[0, -0.81, 0.33]} material-roughnessMap={materials.tex_cloud_ref.map} material-color={items.lid.color} />

          {/* Strip */}
          <mesh name={'lid'} geometry={nodes.strip.geometry} material-color={0xACACAC} material-roughnessMap={materials.tex_cloud_ref.map} material={nodes.strip.material} position={[0, -0.81, 0.33]} />

          <mesh name={'lid'} geometry={nodes.lid_inside.geometry} material={nodes.lid_inside.material} material-color={0xEEEEEE} material-roughnessMap={materials.tex_cloud_ref.map} position={[0, -0.81, 0.33]} />
          <mesh name={'lid'} geometry={nodes.lid_liner.geometry} material={nodes.lid_liner.material} material-color={0x111111} material-roughnessMap={materials.tex_cloud_ref.map} position={[0, -0.81, 0.33]} />
        </group>

        {/* Bin */}
        <mesh name={'bin'} geometry={nodes.bin.geometry} material={materials.mat_bin_vinyl} material-roughness={0.5} material-roughnessMap={materials.tex_cloud_ref.map} material-transparent={true} position={[0, -0.26, 0]} material-map={items.bin.texture} material-opacity={items.bin.texture ? 1 : 0} onUpdate={self => self.material.needsUpdate = true} />
        <mesh geometry={nodes.bin.geometry} material={materials.mat_bin_base} material-roughnessMap={materials.tex_cloud_ref.map} position={[0, -0.26, 0]} material-color={items.bin.color} />

        {/* Decals */}
        <mesh name={'front_decal'} material={materials.mat_front_decal} material-color={0xFFFFFF} material-alphaTest={0.8} material-opacity={items.front_decal.texture ? 1 : 0} material-map={items.front_decal.texture} material-roughnessMap={materials.tex_cloud_ref.map} geometry={nodes.front_decal.geometry} position={[0, -0.26, 0]} onUpdate={self => self.material.needsUpdate = true} />
        <mesh name={'rear_bottom_decal'} material={materials.mat_rear_bottom_decal} material-color={0xFFFFFF} material-alphaTest={0.8} material-opacity={items.rear_bottom_decal.texture ? 1 : 0} material-map={items.rear_bottom_decal.texture} material-roughnessMap={materials.tex_cloud_ref.map} geometry={nodes.rear_bottom_decal.geometry} position={[0, -0.26, 0]} onUpdate={self => self.material.needsUpdate = true} />
        <mesh name={'rear_top_decal'} material={materials.mat_rear_top_decal} material-color={0xFFFFFF} material-alphaTest={0.8} material-opacity={items.rear_top_decal.texture ? 1 : 0} material-map={items.rear_top_decal.texture} material-roughnessMap={materials.tex_cloud_ref.map} geometry={nodes.rear_top_decal.geometry} position={[0, -0.26, 0]} onUpdate={self => self.material.needsUpdate = true} />
        <mesh name={'side_arm_decal'} material={materials.mat_side_arm_aluminum} material-color={items.aluminum.color} material-alphaTest={0.1} material-opacity={items.side_arm_decal.texture ? 1 : 0} material-flatShading={false} material-bumpScale={items.side_arm_decal.engraveDepth_slider.value} material-bumpMap={items.side_arm_decal.texture} material-alphaMap={items.side_arm_decal.texture} material-transparent={true} material-roughnessMap={materials.tex_cloud_ref.map} geometry={nodes.side_arm_decal.geometry} position={[0, -0.26, 0]} onUpdate={self => self.material.needsUpdate = true} />

        {/* Screen */}
        <mesh geometry={nodes.screen.geometry} material={materials.mat_screen} material-roughnessMap={materials.tex_cloud_ref.map} material-color={0x0A0716} position={[0, -0.26, 0]} />

        {/* Tail lights */}
        <mesh geometry={nodes.tail_lights.geometry} material={materials.mat_tail_lights} position={[0, -0.26, 0]} />

        {/* Eyes */}
        <mesh geometry={nodes.eye_lense.geometry} material={nodes.eye_lense.material} position={[0, -0.26, 0]} />

        <mesh name={'aluminum'} geometry={nodes.aluminum.geometry} material={nodes.aluminum.material} material-color={items.aluminum.color} position={[0, -0.26, 0]} />
        <mesh geometry={nodes.black_glass.geometry} material={materials.mat_lense} material-color={0x0A0716} material-roughnessMap={materials.tex_cloud_ref.map}  position={[0, -0.26, 0]} />
        <mesh geometry={nodes.black_plastic.geometry} material={nodes.black_plastic.material} material-roughnessMap={materials.tex_cloud_ref.map}  position={[0, -0.26, 0]} />
        <mesh geometry={nodes.black_plastic_base.geometry} material={nodes.black_plastic_base.material} material-roughnessMap={materials.tex_cloud_ref.map} position={[0, -0.26, 0]} />
        <mesh geometry={nodes.blocker.geometry} material={materials.mat_light_blocker} material-color={0x111111} position={[0, -0.26, 0]} />
        <mesh geometry={nodes.eye_plate.geometry} material={materials.mat_metal_black_rough} material-color={0x444444} material-roughnessMap={materials.tex_cloud_ref.map} position={[0, -0.26, 0]} />
        <mesh geometry={nodes.liner.geometry} material={nodes.liner.material} material-roughnessMap={materials.tex_cloud_ref.map} position={[0, -0.26, 0]} />
      </group>

      {/* Floor */}
      {items.scene.showShadow && <mesh material={materials.mat_floor} material-transparent={true} material-color={0x000000} material-alphaMap={materials.tex_floor_ref.map} geometry={nodes.floor.geometry} />}
    </group>
  )
}

useGLTF.preload('serve.glb')
