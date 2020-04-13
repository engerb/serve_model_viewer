import React from 'react';
import ModelViewer from './components/ModelViewer';

import 'three';
import 'three/examples/js/controls/OrbitControls';
import 'three/examples/js/loaders/GLTFLoader';
import 'three/examples/js/loaders/DRACOLoader';
import 'three/examples/js/loaders/RGBELoader'; 

function App() {
    return (
        <ModelViewer/>
    );
}

export default App;