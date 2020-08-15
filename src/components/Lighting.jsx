import React, { useState, useRef, useEffect, Component } from "react";
import { Canvas, useFrame, useThree, extend, useLoader } from 'react-three-fiber'
import {PMREMGenerator} from "three/src/extras/PMREMGenerator";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader";
import {UnsignedByteType} from "three";

const Lighting = (props) => {
    const light = useRef()
    const { gl, scene } = useThree();

    // bind a parent state to know when loaded / ready

    useEffect(() => {
        const pmremGenerator = new PMREMGenerator(gl);
        const loader = new RGBELoader();
        loader.setDataType(UnsignedByteType);
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
    }, [scene]);    

    return null
}

export default Lighting;