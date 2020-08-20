import React, { useState, useRef, useEffect, Component } from "react";
import { Canvas, useFrame, useThree, extend, useLoader } from 'react-three-fiber'
import {PMREMGenerator} from "three/src/extras/PMREMGenerator";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader";
import {UnsignedByteType} from "three";

const Lighting = (props) => {
    const { gl, scene } = useThree();
    const [currentImage, setCurrentImage] = useState(null)

    const loader = new RGBELoader();
    loader.setDataType(UnsignedByteType);

    useEffect(() => {
        if (props.image !== currentImage) {
            setCurrentImage(props.image);

            console.log("light")

            const pmremGenerator = new PMREMGenerator(gl);
            pmremGenerator.compileEquirectangularShader();

            loader.load(
                props.image,
                texture => {
                    const textureData = pmremGenerator.fromEquirectangular(texture).texture;
                    scene.environment = textureData;
                    texture.dispose();
                    pmremGenerator.dispose();
                }
            )
        }
    }, [scene, props]);    

    return null
}

export default Lighting;