import React from 'react';
import Scene from './components/Scene';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import DefaultCMF from './DefaultCMF';

import 'three';
import 'three/examples/js/controls/OrbitControls';
import 'three/examples/js/loaders/GLTFLoader';
import 'three/examples/js/loaders/DRACOLoader';
import 'three/examples/js/loaders/RGBELoader';

import CCapture from '../node_modules/ccapture.js/src/CCapture.js';
import '../node_modules/ccapture.js/src/tar.js';

class App extends React.Component {
    constructor() {
        super();

    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/demo'>
                        <Scene 
                            customizer = {false} 
                            bg = {'black'}
                        />
                    </Route>
                    <Route path='/'>
                        <Scene 
                            customizer = {true}
                            bg = {'white'}
                            DefaultCMF = {DefaultCMF}
                        />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;