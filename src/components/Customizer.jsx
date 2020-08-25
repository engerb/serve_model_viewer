import React, {useRef} from "react";
import DefaultCMF from './DefaultCMF'
import useStore from './Store';

export default function Customizer(props) {
    const imageInput = useRef();

    // States
    const textures = ((menu = props.menu) => {
        if (menu === 'lid') {
            return useStore(state => state.lidDecals);
        } else if (menu === 'bin') {
            return useStore(state => state.binDecals);
        } else if (menu === 'frontDecal' || menu === 'rearTopDecal' || menu === 'rearBottomDecal') {
            return useStore(state => state.generalDecals);
        }
    })();

    const selectedTextureIndex = ((menu = props.menu) => {
        if (menu === 'lid') {
            return useStore(state => state.lidIndex);
        } else if (menu === 'bin') {
            return useStore(state => state.binIndex);
        } else if (menu === 'frontDecal') {
            return useStore(state => state.frontIndex);
        } else if (menu === 'rearTopDecal') {
            return useStore(state => state.rearTopIndex);
        } else if (menu === 'rearBottomDecal') {
            return useStore(state => state.rearBottomIndex);
        }
    })();

    const colors = ((menu = props.menu) => {
        if (menu === 'lid' || menu === 'bin') {
            return useStore(state => state.colors);
        } 
    })();

    const selectedColorIndex = ((menu = props.menu) => {
        if (menu === 'lid') {
            return useStore(state => state.lidColorIndex);
        } else if (menu === 'bin') {
            return useStore(state => state.binColorIndex);
        } 
    })();

    const roughness = ((menu = props.menu) => {
        if (menu === 'lid') {
            return useStore(state => state.binRoughness);
        } else if (menu === 'bin') {
            return useStore(state => state.lidRoughness);
        } 
    })();

    // Copywriting
    const titleCopy = ((menu = props.menu) => {
        if (menu === 'lid') {
            return <h3>Customize the lid</h3>;
        } else if (menu === 'bin') {
            return <h3>Customize the bin</h3>;
        } else if (menu === 'frontDecal') {
            return <h3>Front of Serve</h3>;
        } else if (menu === 'rearTopDecal') {
            return <h3>Rear top of Serve</h3>;
        } else if (menu === 'rearBottomDecal') {
            return <h3>Rear bottom of Serve</h3>;
        } else if (menu === 'config') {
            return <h3>Advanced options</h3>;
        } 
    })();

    const colorCopy = ((menu = props.menu) => {
        if (menu === 'lid') {
            return <p>Base lid colour</p>;
        } else if (menu === 'bin') {
            return <p>Base bin colour</p>;
        } 
    })();

    const decalCopy = ((menu = props.menu) => {
        if (menu === 'lid') {
            return <p>Vinyl decals / wrap on lid</p>;
        } else if (menu === 'bin') {
            return <p>Vinyl decals / wrap on bin</p>;
        } else if (menu === 'frontDecal') {
            return <p>Vinyl decals on front</p>;
        } else if (menu === 'rearTopDecal') {
            return <p>Vinyl decals on top rear</p>;
        } else if (menu === 'rearBottomDecal') {
            return <p>Vinyl decals on bottom rear</p>;
        } 
    })();

    // Methods
    const addTexture = ((menu = props.menu) => {
        if (menu === 'lid') {
            return useStore(state => state.addLidDecal);
        } else if (menu === 'bin') {
            return useStore(state => state.addBinDecal);
        } else if (menu === 'frontDecal' || menu === 'rearTopDecal' || menu === 'rearBottomDecal') {
            return useStore(state => state.addGeneralDecal);
        }
    })(); 

    const setTextureIndex = ((menu = props.menu) => {
        if (menu === 'lid') {
            return useStore(state => state.setLidDecal);
        } else if (menu === 'bin') {
            return useStore(state => state.setBinDecal);
        } else if (menu === 'frontDecal') {
            return useStore(state => state.setFrontDecal);
        } else if (menu === 'rearTopDecal') {
            return useStore(state => state.setRearTopDecal);
        } else if (menu === 'rearBottomDecal') {
            return useStore(state => state.setRearBottomDecal);
        }
    })();

    const setColorIndex = ((menu = props.menu) => {
        if (menu === 'lid') {
            return useStore(state => state.setLidColor);
        } else if (menu === 'bin') {
            return useStore(state => state.setBinColor);
        } 
    })();

    // Stuff for rotation / rendering / lighting, etc
    // const html buttons, etc

    // helpers
    const checkContrast = ( hex ) => {
        const threshold = 160; // close to half 256 ~130
			
        const r = parseInt( hex.substring(1, 3), 16);
        const g = parseInt( hex.substring(3, 5), 16);
        const b = parseInt( hex.substring(5, 7), 16);
            
        const cBrightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        
        if (cBrightness > threshold) {
            return 'black';
        } else { 
            return 'white';
        }	
    }

    const addWrap = (event) => {
        event.stopPropagation();
        event.preventDefault();

        // Get the file and name
        const file = event.target.files[0];
        // const fileName = event.target.files[0].name;
        // hash the name?
        const url = URL.createObjectURL(file);

        addTexture( url );
        setTextureIndex( textures.length - 1 );
        // select
    }

    // UI
    const colorUI = (()=>{
        if (colors) {
            return <div>
                    {colorCopy}
                    <div className = {`colors ${props.menu}`}>
                    {colors.map( (color, index) => {
                        return <div className = {`${checkContrast(color)} ${ selectedColorIndex === index ? 'active' : ''} ${(color == '#FFFFFF') ? 'stroke' : ''}`} 
                            key = { index } 
                            data-index = { index } 
                            style = { {backgroundColor: `${color}`} } 
                            onClick = {((event) => {
                                event.stopPropagation();
                                event.preventDefault();      
                                setColorIndex( Number(event.target.getAttribute('data-index')) ); 
                            })}
                        />
                    })}

                    {/* // optionally add more colours  */}
                    {/* <div className = 'customColor'/> */}
                </div>
            </div>
        } else {
            return null;
        }
    })()

    const textureUI = (()=>{
        if (textures) {
            return <div>
                    {decalCopy}
                    <div className = {`decals ${props.menu}`}>
                    {textures.map( (img, index) => {
                        return <div className = {`${ selectedTextureIndex === index ? 'active' : ''}`} 
                            key = { index } 
                            data-index = { index } 
                            style={{
                                backgroundImage: `url(${img})`, // Event when loaded?
                                backgroundColor: `${ (props.menu === 'lid' || props.menu === 'bin') ? colors[ selectedColorIndex ] : 'white' }`
                            }} 
                            onClick = {((event) => {
                                event.stopPropagation();
                                event.preventDefault();
                                setTextureIndex( Number(event.target.getAttribute('data-index')) ); 
                            })}
                        />
                    })}

                    <input id='myInput'
                        type = 'file'
                        accept = 'image/*'
                        ref = {imageInput}
                        style = {{display: 'none'}}
                        onChange = { (event)=> addWrap(event) }
                    />

                    <div className='addWrap' onClick={()=>{imageInput.current.click()}} />
                </div>
            </div>
        } else {
            return null;
        }
    })()

    return (
        <div 
            className = 'floatingConfigBox'
            style={{position: 'absolute', zIndex: '10000'}}
                onClick={(e) => { 
                        e.stopPropagation(); 
                        // setActiveMenu('none');
                    }}
            // onPointerOver={(e) => {e.stopPropagation()}}
            // onPointerOut={(e) => {e.stopPropagation()}}
            // onClick={(e) => {e.stopPropagation()} }
            >
            {titleCopy}
            {textureUI}
            {colorUI}
        </div>
    )
}