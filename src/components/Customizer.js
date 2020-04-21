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
            // allMenuStates: ['binColors', 'binWraps', 'lidColors', 'lidWraps', 'options'],
        }

        // Send up first of the textures for model load
        props.setDefaults({
            binWrap: this.state.binWraps[ this.state.binWraps.findIndex(obj => obj.selected) ].img,
            lidWrap: this.state.lidWraps[ this.state.lidWraps.findIndex(obj => obj.selected) ].img,
            binColor: this.state.colors[ this.state.colors.findIndex(obj => obj.selectedBin) ].color,
            lidColor: this.state.colors[ this.state.colors.findIndex(obj => obj.selectedLid) ].color,
        });

        // this.handleLidUpload = this.handleLidUpload.bind(this);
        // this.handleBinUpload = this.handleBinUpload.bind(this);
    }

    // // No need to actually "upload" or any of that base64 stuff!
    // handleLidUpload(event) {
    //     event.stopPropagation();
    //     event.preventDefault();
        
    //     const file = event.target.files[0];
    //     const url = URL.createObjectURL(file);
    //     const newArr = this.state.binWraps;

    //     newArr.push({

    //     });

    //     this.setState({
    //         lidWraps: newArr,
    //     });

    //     this.selectLid(newArr.length - 1);
    // }

    // handleBinUpload(event) {
    //     event.stopPropagation();
    //     event.preventDefault();
        
    //     const file = event.target.files[0];
    //     const url = URL.createObjectURL(file);
    //     const newArr = this.state.bins;
    //     newArr.push(url);

    //     this.setState({
    //         binWraps: newArr,
    //     });

    //     this.selectBin(newArr.length - 1);
    // }

    // selectLidWrap(idx) {
    //     this.props.updateLidTexture( this.state.lids[idx] );
        


    //     this.setState({
    //         selectedLidWrap: idx,
    //     });
    // }

    // selectBinWrap(idx) {
    //     this.props.updateBinTexture( this.state.bins[idx] );
        

    //     this.setState({
    //         selectedBinWrap: idx,
    //     });
    // }

    checkContrast(hex) {
        // check if low contrast against white, then return 'lowContrast'

        return;
    }

    render() {
        return (
            <div className='customizer'>
                
                {[].map(() => {
                    return <div className={`binColors ${(this.menuState == 'binColors') ? "active" : ""}`}>
                        {this.state.colors.map( (obj, index) => {
                        return <div className = {
                                    `binColors ${this.checkContrast(obj.color)} ${(obj.selectedBin) ? "active" : ""} ${(obj.color == '#FFFFFF') ? "stroke" : ""}`
                                } 
                                key = { index } 
                                data-key = { index } 
                                style = { {backgroundColor: `${obj.color}`} } 
                                // onClick = {(e) => this.selectColor( e.target.getAttribute('data-key'), 'binColors' )} 
                            />;  
                        })}
                </div>
                }   

                {/* <div className='lids'>
                    <input 
                        className='colorPicker' 
                        type='color'  
                        value={this.state.lidColor}
                        onChange = {(e) => {
                            this.setState({ lidColor: e.target.value });
                            this.value = this.state.lidColor;
                            this.props.setLidColor( e.target.value );
                        }}
                    />
                    <div className='addedLids'>
                        {this.state.lids.map( (texture, index) => {
                            return <div 
                                    className={`lid selecter ${(index == this.state.selectedLid) ? "active" : ""}`} 
                                    key={ index } 
                                    data-key={ index } 
                                    style={{backgroundImage: `url(${texture})`}} 
                                    onClick = {(e) => this.selectLid( e.target.getAttribute('data-key') )} 
                                />;  
                        })}
                    </div>

                    <input id='myInput'
                        type='file'
                        accept='image/*'
                        ref='lidFileUploader'
                        style={{display: 'none'}}
                        onChange={this.handleLidUpload}
                    />

                    <div 
                        className='addNew' 
                        onClick={()=>{this.refs.lidFileUploader.click()}}
                    />
                </div>
                <div className='bins'>
                    <input 
                        className='colorPicker' 
                        type='color'  
                        value={this.state.binColor}
                        onChange = {(e) => {
                            this.setState({ binColor: e.target.value });
                            this.value = this.state.binColor;
                            this.props.setBinColor( e.target.value );
                        }}
                    />
                    <div className='addedBins'>
                        {this.state.binWraps.map( (texture, index) => { 
                            return <div 
                                    className={`bin selecter ${(index == this.state.selectedBin) ? "active" : ""}`} 
                                    key={ index } 
                                    data-key={ index } 
                                    style={{backgroundImage: `url(${texture})`}} 
                                    onClick = {(e) => this.selectBin( e.target.getAttribute('data-key') )} 
                                />;  
                        })}
                    </div>

                    <input id='myInput'
                        type='file'
                        accept='image/*'
                        ref='binFileUploader'
                        style={{display: 'none'}}
                        onChange={this.handleBinUpload}
                    />

                    <div 
                        className='addNew' 
                        onClick={()=>{this.refs.binFileUploader.click()}}
                    />
                </div> */}
            </div>
        );
    }
}

export default Customizer;