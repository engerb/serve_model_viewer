import React, { useRef } from 'react'
import { Math } from 'three'
import { HexColorPicker } from 'react-colorful'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { withStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider';
import useStore from './Store'

import './Customizer.scss'

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider)

const PurpleSwitch = withStyles({
    switchBase: {
        color: 'fff',
        '&$checked': {
            color: '#52af77',
        },
        '&$checked + $track': {
            backgroundColor: '#52af77',
        },
    },
    checked: {},
    track: {
        backgroundColor: 'grey'
    },
})(Switch)

export default (props) => {
    const [current, setCurrent, items, scene, setItem, loadTexture, rendering, setRendering] = useStore(state => [state.current, state.setCurrent, state.items, state.items.scene, state.setItem, state.loadTexture, state.rendering, state.setRendering])
    const currentItem = current ? items[current] : null
    const imageInput = useRef()

    const checkContrast = (hex) => {
        const threshold = 160 // close to half 256 ~130
			
        const r = parseInt( hex.substring(1, 3), 16)
        const g = parseInt( hex.substring(3, 5), 16)
        const b = parseInt( hex.substring(5, 7), 16)
            
        const cBrightness = ((r * 299) + (g * 587) + (b * 114)) / 1000
        
        if (cBrightness > threshold) {
            return 'white'
        } else { 
            return 'black'
        }	
    }

    const isHex = (h) => {
        let a = parseInt(h,16);
        return (a.toString(16) === h)
    }

    const renderGuide = (show = true) => {
        if (rendering) {
            return
        }

        if (show) {
            scene.renderWidth = String(scene.width_render_px_slider.value / 2) + 'px'
            scene.renderHeight = String(scene.height_render_px_slider.value / 2) + 'px'
        } else {
            scene.renderWidth = '100%'
            scene.renderHeight = '100%'
        }
        
        setItem()
    }

    const render = (action = 'render frame') => {
        scene.renderWidth = String(scene.width_render_px_slider.value / 2) + 'px'
        scene.renderHeight = String(scene.height_render_px_slider.value / 2) + 'px'
        setRendering(true)

        if (action === 'render video') {
            // const frameCount = 24 * 4
            // const inc = 6.28319 / frameCount // 360rad
            // // items.scene.serveAngle_slider.value = 0
            // // setItem()

            // for (let f = 0; f < frameCount; f++) {
            //     items.scene.serveAngle_slider.value = (items.scene.serveAngle_slider.value + inc) % 6.28319
            //     setItem()
            // }
        } else {
            const canvas = document.getElementsByTagName('canvas')[0]
                    
            if (canvas) {
                const url = canvas.toDataURL( 'image/png' )
                const link = document.createElement('a')

                link.setAttribute('href', url)
                link.setAttribute('target', '_blank')
                link.setAttribute('download', 'render')

                link.click()
            } else {
                console.warn('Could not find canvas to render from!')
            }
        }

        // scene.renderWidth = '100%'
        // scene.renderHeight = '100%'
        setRendering(false)
    }

    return (
        <div className={`Customizer`}>
            {currentItem &&
                <div className={`Actions ${checkContrast(scene.color)}`}> 
                    <div className={`ItemActions ${checkContrast(scene.color)}`}> 
                        {currentItem.color &&
                            <div className={`ColorPicker`}>
                                <HexColorPicker className='picker' color={currentItem.color} onChange={(color) => (currentItem.color = color, setItem())} />
                                <input type='text' value={currentItem.color} onChange={(e) => {
                                    console.log(e.target.value)
                                    let str = String(e.target.value)
                                    str = str.replace('#', '')
                                    str = str.substring(0, 6)
                                    
                                    if (isHex(str)) {
                                        currentItem.color = '#' + str
                                    }

                                    setItem()
                                }}/>
                            </div>
                        }
                        <h1>{currentItem.name}</h1>
                    </div>
                    <div className={`OtherActions ${checkContrast(scene.color)}`}>
                        {'textures' in currentItem &&
                            <div className={'Textures'}>
                                {currentItem.textures.map( (texture, index) => {
                                    return <div className = {`Texture ${ currentItem.selectedIndex === index ? 'active' : ''} ${current}`} 
                                        key = { index }  
                                        style={{ 
                                            backgroundImage: `url(${texture})`,
                                            backgroundColor: (current == 'bin' || current == 'lid') ? currentItem.color : items.aluminum.color
                                        }} 
                                        onClick = {((e) => {
                                            e.stopPropagation()
                                            e.preventDefault()

                                            if (currentItem.selectedIndex == index) {
                                                currentItem.selectedIndex = null
                                                currentItem.texture = loadTexture(null)
                                            } else {
                                                currentItem.selectedIndex = index
                                                currentItem.texture = loadTexture(texture)
                                            }
                                            setItem()
                                        })}
                                    />
                                })}
                                <div className='addWrap' onClick={()=>{imageInput.current.click()}}>
                                    + Add
                                </div>
                            </div>
                        }
                        <FormGroup row className={'sliders'}>
                            {Object.entries(currentItem).map(([key, value]) => {
                                if (key.includes('slider')) {
                                    return <FormControlLabel key={key}
                                        control={
                                            <PrettoSlider
                                                value={((key.includes('angle') || key.includes('Angle')) ? parseInt(Math.radToDeg(currentItem[key].value)) : currentItem[key].value)}
                                                valueLabelDisplay='auto'
                                                onChange={(e, val) => (
                                                    currentItem[key].value = ((key.includes('angle') || key.includes('Angle')) ? Math.degToRad(val) : val), setItem(),
                                                    key.includes('render_px') ? renderGuide(true) : null
                                                )}
                                                step={currentItem[key].step ? currentItem[key].step : 0.01}
                                                min={currentItem[key].range ? currentItem[key].range[0] : 0}
                                                max={currentItem[key].range ? currentItem[key].range[1] : 100}
                                                name={currentItem[key].name ? currentItem[key].name : key}
                                                color='primary'
                                                onMouseEnter={(e) => (key.includes('render') ? renderGuide(true) : null)}
                                                onMouseLeave={(e) => (key.includes('render') ? renderGuide(false) : null)}
                                            />
                                        }
                                        label={currentItem[key].name ? currentItem[key].name : key}
                                    />
                                }
                            })}
                        </FormGroup>
                        <FormGroup row className={'switch'}>
                            {Object.entries(currentItem).map(([key, value]) => {
                                if (typeof value === 'boolean') {
                                    return <FormControlLabel key={key}
                                        control={
                                            <PurpleSwitch
                                                checked={value}
                                                onChange={(e) => (currentItem[key] = e.target.checked, setItem())}
                                                name={key}
                                                color='primary'
                                            />
                                        }
                                        label={key}
                                    />
                                }
                            })}
                        </FormGroup>
                        <FormGroup row className={'buttons'}>
                            {Object.entries(currentItem).map(([key, value]) => {
                                if (key.includes('button')) {
                                    return <div className={`Button`} key={key}
                                        onMouseEnter={(e) => (key.includes('render') ? renderGuide(true) : null)}
                                        onMouseLeave={(e) => (key.includes('render') ? renderGuide(false) : null)}
                                        onClick={(e)=>{
                                            e.stopPropagation()
                                            e.preventDefault()

                                            if (key.includes('render')) {
                                                render(currentItem[key].action)
                                            }
                                        }}>
                                        {currentItem[key].name}
                                    </div>
                                }
                            })}
                        </FormGroup>
                    </div>
                    <input id='myInput'
                        type = 'file'
                        accept = 'image/*'
                        ref = {imageInput}
                        style = {{display: 'none'}}
                        onChange = { (e) => {
                            e.stopPropagation()
                            e.preventDefault()

                            // Get the file and name
                            const file = e.target.files[0]
                            if (file) {
                                const url = URL.createObjectURL(file)
                                
                                currentItem.textures.push(url)
                                currentItem.selectedIndex = currentItem.textures.length - 1
                                currentItem.texture = loadTexture(url)

                                setItem()
                            }
                        } }
                    />
                </div>
            }
            <div className={`GlobalActions ${checkContrast(scene.color)}`}>
                {/* <FormControlLabel
                    control={
                        <PurpleSwitch
                            checked={background == 'black' ? true : false}
                            onChange={(e) => (setBackground(background == 'black' ? 'white' : 'black'))}
                            name={'darkMode'}
                            color='primary'
                        />
                    }
                    label={`Dark Mode`}
                /> */}
                {/* <div className={`Button`}
                    onClick={(e)=>{
                        e.stopPropagation()
                        e.preventDefault()

                        const canvas = document.getElementsByTagName('canvas')[0]

                        if (canvas) {
                            const url = canvas.toDataURL( 'image/png' )
                            const link = document.createElement('a')

                            link.setAttribute('href', url)
                            link.setAttribute('target', '_blank')
                            link.setAttribute('download', 'render')

                            link.click()
                        } else {
                            console.warn('Could not find canvas to render from!')
                        }
                    }}>
                    📷 Save PNG
                </div> */}
                <div className={`Button`}
                    onClick={(e)=>{
                        e.stopPropagation()
                        setCurrent('scene')
                    }}>
                    Scene and rendering
                </div>
            </div>
        </div>
    )
}
