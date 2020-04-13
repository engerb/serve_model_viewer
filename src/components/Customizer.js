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

    render() {
        return (
            <div className='yolo' />
        );
    }
}

export default Customizer;