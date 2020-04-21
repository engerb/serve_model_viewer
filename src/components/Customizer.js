import React from "react";

class Customizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            binWraps: [
                {
                    img: require('../assets/3d/Serve/wraps/bin_1.png').default,
                    name: 'bin_1',
                    selected: true,
                },
                {
                    img: require('../assets/3d/Serve/wraps/bin_2.png').default,
                    name: 'bin_2',
                    selected: false,
                },
            ],
            lidWraps: [
                {
                    img: require('../assets/3d/Serve/wraps/lid_1.png').default,
                    name: 'lid_1',
                    selected: true,
                },
                {
                    img: require('../assets/3d/Serve/wraps/lid_2.png').default,
                    name: 'lid_2',
                    selected: false,
                },
            ],
            colors: [
                {
                    color: '#1A1A1A',
                    name: 'Black',
                    selectedBin: false,
                    selectedLid: false,
                },
                {
                    color: '#FDF150',
                    name: 'Postmates yellow',
                    selectedBin: false,
                    selectedLid: false,
                },
                {
                    color: '#5499ED',
                    name: 'Blue',
                    selectedBin: false,
                    selectedLid: false,
                },
                {
                    color: '#FABC0F',
                    name: 'Safety yellow',
                    selectedBin: false,
                    selectedLid: false,
                },
                {
                    color: '#FFFFFF',
                    name: 'Default white',
                    selectedBin: true,
                    selectedLid: true,
                },
            ],
            menuState: 'binColors', // binColors, binWraps, lidColors, lidWraps, options
        }

        // Send up first of the textures for model load
        props.setDefaults({
            binWrap: this.state.binWraps[ this.state.binWraps.findIndex(obj => obj.selected) ].img,
            lidWrap: this.state.lidWraps[ this.state.lidWraps.findIndex(obj => obj.selected) ].img,
            binColor: this.state.colors[ this.state.colors.findIndex(obj => obj.selectedBin) ].color,
            lidColor: this.state.colors[ this.state.colors.findIndex(obj => obj.selectedLid) ].color,
        });

        this.newWrap = this.newWrap.bind(this);
    }

    checkContrast( hex ) {
        // check if low contrast against white, then return 'lowContrast'

        return "";
    }

    setColor( index, menuState = this.state.menuState ) {
        console.log([index, menuState]);
        return;
    }

    setWrap( index, menuState = this.state.menuState ) {
        // Copy and mutate correct wraps object
        const newObj = this.state[menuState];
        newObj[ newObj.findIndex(obj => obj.selected) ].selected = false;
        newObj[ index ].selected = true; 

        // Update state with mutated sub object
        this.setState({
            [menuState]: newObj,
        });

        // Then apply new wrap
        if (menuState == 'binWraps') {
            this.props.setBinWrap( newObj[ index ].img );
        } else {
            this.props.setLidWrap( newObj[ index ].img );
        }
    }

    newWrap( event, menuState = this.state.menuState ) {
        event.stopPropagation();
        event.preventDefault();
        
        // Get the file and name
        const file = event.target.files[0];
        const fileName = event.target.files[0].name;
        const url = URL.createObjectURL(file);
        
        // Copy and mutate correct wraps object
        const newObj = this.state[menuState];
        newObj.push({
            img: url,
            name: fileName,
            selected: false,
        });

        // Update state with mutated sub object
        this.setState({
            [menuState]: newObj,
        });

        // Then select newly added wrap
        this.setWrap( newObj.findIndex(obj => obj.selected), menuState );
    }

    render() {
        return (
            <div className = 'customizer'>
                
                <div className = 'actions' >
                    {['binColors', 'lidColors'].map((menuState, menuKey) => {
                        return <div className = {`${menuState} ${(menuState == this.state.menuState) ? 'active' : 'hidden'}`} key = { menuKey }>
                            {this.state.colors.map( (obj, index) => {
                                return <div className = {`${this.checkContrast(obj.color)} ${( ( (menuState == 'binColors') ? obj.selectedBin : obj.selectedLid ) ) ? 'active' : ''} ${(obj.color == '#FFFFFF') ? 'stroke' : ''}`} 
                                    key = { index } 
                                    data-index = { index } 
                                    style = { {backgroundColor: `${obj.color}`} } 
                                    onClick = {(() => {
                                        // Can not re-select is allready selected
                                        if ((menuState == 'binColors' && !obj.selectedBin) || (menuState == 'lidColors' && !obj.selectedLid)) {
                                            return (event) => this.setColor( event.target.getAttribute('data-index'), menuState )
                                        }
                                    })}
                                />;  
                            })}
                            
                            {/* // optionally add more colours  */}
                            {/* <div className = 'customColor'/> */}
                        </div>
                    })} 
                    {['binWraps', 'lidWraps'].map((menuState, menuKey) => {
                        return <div className = {`${menuState} ${(menuState == this.menuState) ? 'active' : 'hidden'}`} key = { menuKey }>
                            {this.state[menuState].map( (obj, index) => {
                                return <div className = {`${ obj.selected ? 'active' : ''}`} 
                                    key = { index } 
                                    data-index = { index } 
                                    style={{backgroundImage: `url(${obj.img})`}} 
                                    onClick = {(() => {
                                        // Can not re-select is allready selected
                                        if (menuState != this.menuState) {
                                            return (event) => this.setWrap( event.target.getAttribute('data-index'), menuState )
                                        }
                                    })}
                                />;  
                            })}

                            <input id='myInput'
                                type = 'file'
                                accept = 'image/*'
                                ref = {`fileUploader_${menuState}`}
                                style = {{display: 'none'}}
                                onChange = { (event)=> this.newWrap(event, menuState) }
                            />

                            <div className='addWrap' onClick={()=>{this.refs[`fileUploader_${menuState}`].click()}} />
                        </div>
                    })} 
                </div>
            </div>
        );
    }
}

export default Customizer;