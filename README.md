# Serve model viewer
Built with React and Three.js, you can view the hosted app [here](https://serve-cmf.herokuapp.com/).

![Demo](demo/demo.gif?raw=true "Demo")

# How to run
* Install node_modules: `npm install`
* Run (dev): `npm run-script start-dev`

# How to build and deploy
* Build: `npm run-script build`
* Deploy contents of `dist` to server
* ...
* Profit!

# Exporting Serve from Blender
* If Serve needs to be re-exported from Blender for any reason, the current glTF exporter seems to have some bugs
* Export from Blender as `.glb` without compression as `serve-src.glb` in the Serve folder
* Import to `https://gltf.insimo.com/` and run "Draco compression" with defaults
* Pack as `.glb` and export as `serve.glb` back to Serve folder
* Todo: Make build script run the Draco compression