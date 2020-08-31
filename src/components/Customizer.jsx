import React, {useRef, useEffect, useState, useCallback} from "react";
// import DefaultCMF from './DefaultCMF'
import useStore from './Store';

export default function Customizer(props) {
    const imageInput = useRef();
    const floatingConfigBox = useRef();
    const mainRef = useRef();

    // try: https://dev.to/michalczaplinski/super-easy-react-mount-unmount-animations-with-hooks-4foj

    // States
    // Set this all up in a switch? 
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
        } else if (menu === 'options') {
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

    const canInteractWithModel = useStore(state => state.canInteractWithModel)
    const setInteractWithModel = useStore(state => state.setInteractWithModel)
    const setActiveMenu = useStore(state => state.setActiveMenu)

    // Stuff for rotation / rendering / lighting, etc
    // const html buttons, etc
    const rotateServe = useStore(state => state.rotateServe)
    const toggleRotateServe = useStore(state => state.toggleRotateServe);

    const servePose = useStore(state => state.servePose)
    const setServePose = useStore(state => state.setServePose);
    const incServePose = useStore(state => state.incServePose);
    
    const options = ((menu = props.menu)=>{
        if (menu === 'options') {
            return <div className='buttons'>
                {/* <div className='button' onClick = {(event) => this.props.setLidPos(  )}>
                    <p>Toggle lid</p>
                </div> */}
                {/* <div className='button' onClick = {(event) => this.props.renderOut({ type: 'image' })}>
                    <p>Render png</p>
                </div> */}
                <div className='button' onClick={(e) => {
                    e.stopPropagation(); 
                    if (rotateServe) {
                        toggleRotateServe();
                        setServePose(0);
                    } else {
                        incServePose( 45 );
                    }
                    }}>
                    <p>Rotate 45deg</p>
                </div>
                <div className='button' onClick={(e) => {e.stopPropagation(); toggleRotateServe()}}>
                    <p>{rotateServe ? 'Stop rotation' : 'Start rotation'}</p>
                </div>
                <a className='button' href={ require('../assets/template.zip').default } target='_blank' download='template.zip'>
                    <p>Download template</p>
                </a>
            </div>
        }
    })();

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
        const url = URL.createObjectURL(file);

        addTexture( url );
        setTextureIndex( textures.length - 1 );
    }

    // UI
    const colorUI = (()=>{
        if (colors) {
            return <div>
                    {colorCopy}
                    <div className = {`colors ${props.menu}`}>
                    {colors.map( (color, index) => {
                        return <div className = {`${checkContrast(color)} ${ selectedColorIndex === index ? 'active' : ''} ${(color == '#1A1A1A') ? 'stroke' : ''}`} 
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

    // Decide if we need to calculate the box
    const [mouseDown, _setMouseDown] = useState(false);
    const mouseDownRef = useRef(mouseDown);
    const setMouseDown = data => {
        mouseDownRef.current = data;
        _setMouseDown(data);
    };

    const handleEvents = (e) => {
        if (e.type === 'mousedown') {
            setMouseDown(true)
        } else if (e.type === 'mouseup') {
            setMouseDown(false)
        }

        if (e.type === 'resize') {
            placeFloatingBox()
        }

        if (e.type === 'mousemove' && mouseDownRef.current) {
            placeFloatingBox()
        }
    }

    // 
    const placeFloatingBox = () => {
        console.log('placing...')

        // calculate and place the floating box
    }

    let closeMenuTimeout = null;
    const [menuOpen, setMenuOpen] = useState('close');
    const closeMenu = () => {
        setMenuOpen('close')
        closeMenuTimeout = setTimeout(() => {
            setActiveMenu('none');
        }, 200);
    }

    useEffect(() => {
        setMenuOpen('open')

        // subscribe events
        // if (props.responsiveFloating) {
        //     placeFloatingBox();
        //     window.addEventListener('resize', handleEvents);
        //     window.addEventListener('mousedown', handleEvents);
        //     window.addEventListener('mouseup', handleEvents);
        //     window.addEventListener('mousemove', handleEvents);
        // }

        return () => {
            clearTimeout(closeMenuTimeout);
            setMenuOpen('close')
            setInteractWithModel(true)

            // unsubscribe events
            // if (props.responsiveFloating) {
            //     window.removeEventListener('resize', handleEvents);
            //     window.removeEventListener('mousedown', handleEvents);
            //     window.removeEventListener('mouseup', handleEvents);
            //     window.removeEventListener('mousemove', handleEvents);
            // }
        };
      }, []);

    return (
        <div className = {`customizeWrap ${props.responsiveFloating ? 'floating' : 'fixed'} ${menuOpen}`} ref = {mainRef}>
            <div 
                className = {`floatingConfigBox ${props.responsiveFloating ? 'floating' : 'fixed'}`}
                ref = {floatingConfigBox}
                onPointerOver={(e) => {e.stopPropagation(), setInteractWithModel(false)}}
                onPointerOut={(e) => {e.stopPropagation(), setInteractWithModel(true)}}
                onClick={(e) => {e.stopPropagation()}}
                >
                <div
                    className = 'close'
                    onClick={(e) => {e.stopPropagation(), closeMenu()}}
                />
                {titleCopy}
                {textureUI}
                {colorUI}
                {options}
            </div>
        </div>
    )
}