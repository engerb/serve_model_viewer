import React from "react";

class Customizer extends React.Component {
    constructor(props) {
        super(props);

        // Start these texture arrrays with what we currently have in folder
        this.bins = [
            require('../assets/3d/Serve/wraps/bin_1.png').default,
            require('../assets/3d/Serve/wraps/bin_2.png').default,
        ]

        this.lids = [
            require('../assets/3d/Serve/wraps/lid_1.png').default,
            require('../assets/3d/Serve/wraps/lid_2.png').default,
        ]

        // Send up first of the textures for model load
        props.setDefaults(this.bins[0], this.lids[0]);
    }

    addLid() {

    }

    addBin() {
        
    }

    selectLid(idx) {
        this.props.updateLidTexture( this.lids[idx] );
        // remove all selected class and add to this
    }

    selectBin(idx) {
        this.props.updateBinTexture( this.bins[idx] );
        // remove all selected class and add to this
    }

    render() {
        return (
            <div className='customizer'>
                <div className='lids'>
                    <div className='addedLids'>
                        {this.lids.map( (texture, index) => {
                            return <div className='lid' key={ index } data-key={ index } style={{backgroundImage: `url(${texture})`}} onClick = {(e) => this.selectLid( Number( e.target.getAttribute('data-key')) )} />;  
                        })}
                    </div>
                    <div className='addNew' onClick = {this.addLid()} />
                </div>
                <div className='bins'>
                    <div className='addedBins'>
                        {this.bins.map( (texture, index) => { 
                            return <div className='bin' key={ index } data-key={ index } style={{backgroundImage: `url(${texture})`}} onClick = {(e) => this.selectBin( Number( e.target.getAttribute('data-key')) )} />;  
                        })}
                    </div>
                    <div className='addNew' onClick = {this.addBin()} />
                </div>
            </div>
        );
    }
}

export default Customizer;