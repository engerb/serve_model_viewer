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
    const [current, setCurrent, items, background, setBackground, setItem, loadTexture] = useStore(state => [state.current, state.setCurrent, state.items, state.background, state.setBackground, state.setItem, state.loadTexture])
    const currentItem = current ? items[current] : null
    const imageInput = useRef()

    return (
        <div className={`Customizer`}>
            {currentItem &&
                <div className={`Actions ${background}`}> 
                    <div className={`ItemActions ${background}`}> 
                        {currentItem.color &&
                            <HexColorPicker className='picker' color={currentItem.color} onChange={(color) => (currentItem.color = color, setItem(currentItem))} />
                        }
                        <h1>{currentItem.name}</h1>
                    </div>
                    <div className={`OtherActions ${background}`}>
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
                                            setItem(currentItem)
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
                                if (typeof value === 'number' && !key.includes('Index')) {
                                    return <FormControlLabel key={key}
                                        control={
                                            <PrettoSlider
                                                value={(key.includes('Angle') ? parseInt(Math.radToDeg(value)) : value)}
                                                valueLabelDisplay='auto'
                                                onChange={(e, val) => (currentItem[key] = (key.includes('Angle') ? Math.degToRad(val) : val), setItem(currentItem))}
                                                step={0.01}
                                                min={key.includes('Angle')
                                                    ? key.includes('wheel')
                                                        ? -30
                                                        : 0
                                                    : key.includes('Depth')
                                                        ? -1
                                                        : 0
                                                }
                                                max={key.includes('Angle')
                                                    ? key.includes('wheel')
                                                        ? 30
                                                        : 360
                                                    : key.includes('Depth')
                                                        ? 1
                                                        : 100
                                                }
                                                name={key}
                                                color='primary'
                                            />
                                        }
                                        label={key}
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
                                                onChange={(e) => (currentItem[key] = e.target.checked, setItem(currentItem))}
                                                name={key}
                                                color='primary'
                                            />
                                        }
                                        label={key}
                                    />
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

                                setItem(currentItem)
                            }
                        } }
                    />
                </div>
            }
            <div className={`GlobalActions ${background}`}>
                <FormControlLabel
                    control={
                        <PurpleSwitch
                            checked={background == 'black' ? true : false}
                            onChange={(e) => (setBackground(background == 'black' ? 'white' : 'black'))}
                            name={'darkMode'}
                            color='primary'
                        />
                    }
                    label={`Dark Mode`}
                />
                <div className={`Button`}
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
                </div>
            </div>
        </div>
    )
}
