import React, { useState, useEffect } from "react";
import { useThree } from 'react-three-fiber'
import {PMREMGenerator} from "three/src/extras/PMREMGenerator";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader";
import {UnsignedByteType} from "three";

import useStore from './Store';

const Lighting = () => {
    const { gl, scene } = useThree();
    // const [currentImage, setCurrentImage] = useState(null)
    const image = useStore(state => state.hdri)

    const loader = new RGBELoader();
    loader.setDataType(UnsignedByteType);

    useEffect(() => {
        // if (image !== currentImage) {
            // setCurrentImage(image);

            const pmremGenerator = new PMREMGenerator(gl);
            pmremGenerator.compileEquirectangularShader();

            loader.load(
                image,
                texture => {
                    const textureData = pmremGenerator.fromEquirectangular(texture).texture;
                    scene.environment = textureData;
                    texture.dispose();
                    pmremGenerator.dispose();
                }
            )
        // }
    }, [scene]);    

    return null
}

export default Lighting;