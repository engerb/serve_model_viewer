import React from 'react';
import ModelViewer from './components/ModelViewer';

import 'three';
import 'three/examples/js/controls/OrbitControls';
import 'three/examples/js/loaders/GLTFLoader';
import 'three/examples/js/loaders/DRACOLoader';
import 'three/examples/js/loaders/RGBELoader';

import CCapture from '../node_modules/ccapture.js/src/CCapture.js';
import '../node_modules/ccapture.js/src/tar.js';

function App() {
    return (
        <ModelViewer/>
    );
}

export default App;