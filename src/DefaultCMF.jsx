const DefaultCMF = {
    binDecals: [
        {
            img: require('./assets/3d/Serve/wraps/bin_1.png').default,
            name: 'Bin 1',
            selected: true,
        },
        {
            img: require('./assets/3d/Serve/wraps/bin_2.png').default,
            name: 'Bin 2',
            selected: false,
        },
        {
            img: require('./assets/3d/Serve/wraps/bin_3.png').default,
            name: 'Bin 3',
            selected: false,
        },
        {
            img: require('./assets/3d/Serve/wraps/bin_4.png').default,
            name: 'Bin 4',
            selected: false,
        },
        {
            img: require('./assets/3d/Serve/wraps/bin_5.png').default,
            name: 'Bin 5',
            selected: false,
        },
    ],
    lidDecals: [
        {
            img: require('./assets/3d/Serve/wraps/lid_1.png').default,
            name: 'Lid 1',
            selected: true,
        },
        {
            img: require('./assets/3d/Serve/wraps/lid_2.png').default,
            name: 'Lid 2',
            selected: false,
        },
        {
            img: require('./assets/3d/Serve/wraps/lid_3.png').default,
            name: 'Lid 3',
            selected: false,
        },
        {
            img: require('./assets/3d/Serve/wraps/lid_4.png').default,
            name: 'Lid 4',
            selected: false,
        },
        {
            img: require('./assets/3d/Serve/wraps/lid_5.png').default,
            name: 'Lid 5',
            selected: false,
        },
    ],
    frontDecals: [

    ],
    rearTopDecals: [

    ],
    rearBottomDecals: [

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
    // binColors, binWraps, lidColors, lidWraps, options
    menuState: 'binColors', 
    menuStateCopy: {
        binColors: 'Base bin colour',
        binWraps: 'Vinyl decals / wrap on bin',
        lidColors: 'Base lid colour',
        lidWraps: 'Vinyl decals / wrap on lid',
        options: '',
    }
}

export default DefaultCMF;