import React from "react";

class Customizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lidColor: '#eeeeee',
            binColor: '#eeeeee',
            bins: [
                require('../assets/3d/Serve/wraps/bin_1.png').default,
                require('../assets/3d/Serve/wraps/bin_2.png').default,
            ],
            lids: [
                require('../assets/3d/Serve/wraps/lid_1.png').default,
                require('../assets/3d/Serve/wraps/lid_2.png').default,
            ],
            selectedBin: 0,
            selectedLid: 0,
        }

        // Send up first of the textures for model load
        props.setDefaults(this.state.bins[0], this.state.lids[0]);

        this.handleLidUpload = this.handleLidUpload.bind(this);
        this.handleBinUpload = this.handleBinUpload.bind(this);
    }

    // No need to actually "upload" or any of that base64 stuff!
    handleLidUpload(event) {
        event.stopPropagation();
        event.preventDefault();
        
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        const newArr = this.state.lids;
        newArr.push(url);

        this.setState({
            lids: newArr,
        });

        this.selectLid(newArr.length - 1);
    }

    handleBinUpload(event) {
        event.stopPropagation();
        event.preventDefault();
        
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        const newArr = this.state.bins;
        newArr.push(url);

        this.setState({
            bins: newArr,
        });

        this.selectBin(newArr.length - 1);
    }

    selectLid(idx) {
        this.props.updateLidTexture( this.state.lids[idx] );
        // remove all selected class and add to this
        this.setState({
            selectedLid: idx,
        });
    }

    selectBin(idx) {
        this.props.updateBinTexture( this.state.bins[idx] );
        // remove all selected class and add to this
        this.setState({
            selectedBin: idx,
        });
    }

    render() {
        return (
            <div className='customizer'>
                <div className='lids'>
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
                        {this.state.bins.map( (texture, index) => { 
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
                </div>
            </div>
        );
    }
}

export default Customizer;