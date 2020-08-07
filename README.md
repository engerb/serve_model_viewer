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
* Select all of the model to export in Blender, export `serve_src.glb` with `selection only` and `materials` selected, no compression! This seems to not work.
* Run `npx gltf-pipeline -i serve_src.glb -o serve.glb --stats -d --draco.quantizeNormalBits 8`
* Should just load into `Serve.jsx` if structure has not changed. If structure has, run: `npx gltfjsx serve.glb Serve.jsx`
* Pay attention to the changes, you may now need to go and manually re add some textures, materials and other attributes to the `Serve.jsx`

# Todo / cool ideas:
* Lidar visualization could be an array of cubes with colour and pos. loop through ever 1 or more frames with a ray cast the length of the array, and update the pos / colour of the corresponding cube.
* Use sidewalk gen, SF house gen ideas for n64 on this.