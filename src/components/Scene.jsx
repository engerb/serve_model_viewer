import React, { Suspense, useState, useRef, Component, useEffect } from "react";
import { Canvas, useFrame, useThree, extend, useLoader } from 'react-three-fiber'
import { ACESFilmicToneMapping, sRGBEncoding } from "three";
import { OrbitControls, PerspectiveCamera, Stats } from 'drei'

import Serve from './Serve';
import Lighting from './Lighting';
  
// class Scene extends Component {
//     constructor(props) {
//         super(props);
        
//         // const hdrii = require('../assets/3d/urban_street_04_1k.hdr').default;

//         // this.state = {
//         //     hdri: require('../assets/3d/venice_sunset_1k.hdr').default,
//         //     hdrii: require('../assets/3d/urban_street_04_1k.hdr').default,
//         //     binDecalUrl: this.props.DefaultCMF.binDecals[ this.props.DefaultCMF.binDecals.findIndex(obj => obj.selected) ].img,
//         //     lidDecalUrl: this.props.DefaultCMF.lidDecals[ this.props.DefaultCMF.lidDecals.findIndex(obj => obj.selected) ].img,
//         //     frontDecalUrl: null,
//         //     rearTopDecalUrl: null,
//         //     rearBottomDecalUrl: null,
//         //     binColor: this.props.DefaultCMF.colors[ this.props.DefaultCMF.colors.findIndex(obj => obj.selectedBin) ].color,
//         //     lidColor: this.props.DefaultCMF.colors[ this.props.DefaultCMF.colors.findIndex(obj => obj.selectedLid) ].color
//         // }
//     }

    // componentDidMount() {
    //     this.cmfReducer();
    // }

    // cmfReducer() {
    //     this.props.DefaultCMF.binDecals.map(img => {
    //         if (img.selected) this.setState({binDecalUrl: img.img})
    //     });

    //     this.props.DefaultCMF.lidDecals.map(img => {
    //         if (img.selected) this.setState({lidDecalUrl: img.img})
    //     });

    //     this.props.DefaultCMF.frontDecals.map(img => {
    //         if (img.selected) this.setState({frontDecalUrl: img.img})
    //     });

    //     this.props.DefaultCMF.rearTopDecals.map(img => {
    //         if (img.selected) this.setState({rearTopDecalUrl: img.img})
    //     });

    //     this.props.DefaultCMF.rearBottomDecals.map(img => {
    //         if (img.selected) this.setState({rearBottomDecalUrl: img.img})
    //     });

    //     this.props.DefaultCMF.colors.map(color => {
    //         if (color.selectedBin) this.setState({binColor: color.color})
    //         if (color.selectedLid) this.setState({lidColor: color.color})
    //     });
    // }

    // componentDidMount(){
    //     document.addEventListener("keydown", (e) => {
    //         if (e.key === 'ArrowUp') {
    //             this.setState({binDecalUrl: this.props.DefaultCMF.binDecals[3].img})
    //             this.setState({binColor: this.props.DefaultCMF.colors[1].color})
    //             const thing = this.state.hdrii;
    //             this.setState({hdri: thing})
    
    //             e.preventDefault();
    //         } else if (e.key === 'ArrowDown') {
    //             this.setState({lidDecalUrl: this.props.DefaultCMF.lidDecals[3].img})
    
    //             e.preventDefault();
    //         } else {
    //             // this.setState()
    //         }
    //     });
    // }

    // handleOnKeyDown(e) {
    //     console.log(this.props)
    //     if (e.key === 'ArrowUp') {
    //         this.setState({binDecalUrl: this.props.DefaultCMF.binDecals[3].img})

    //         e.preventDefault();
    //     } else if (e.key === 'ArrowDown') {
    //         this.setState({lidDecalUrl: this.props.DefaultCMF.lidDecals[3].img})

    //         e.preventDefault();
    //     }
    // }

//     render() {
//         return (
//             <div className="modelViewer">
//                 <Canvas
//                     // gl={{ preserveDrawingBuffer: true }}
//                     // invalidateFrameloop
//                     pixelRatio={window.devicePixelRatio}
//                     onCreated={({ gl }) => {
//                       gl.toneMapping = ACESFilmicToneMapping
//                       gl.outputEncoding = sRGBEncoding
//                     }}>
//                     <PerspectiveCamera 
//                         makeDefault
//                         position={[1.5, 1, 1.7]}
//                         fov={45}
//                         near={0.25}
//                         far={20}
//                     />
//                     <OrbitControls
//                         target={[0, 0.5, 0]}
//                         minDistance={1}
//                         maxDistance={5}
//                         enableDamping={true}
//                         dampingFactor={0.3}
//                         minPolarAngle={0.3}
//                         maxPolarAngle={1.7}
//                     />
//                     <Suspense fallback={null}>
//                         <Serve />
//                     </Suspense>
//                     <Lighting />
//                     <Stats />
//                 </Canvas>
//             </div>
//         );
//     }
// }

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

// export default Scene;