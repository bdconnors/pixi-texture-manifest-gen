# pixi-texture-manifest-gen
generates json manifest files for use with pixi.js

**Input(Single)**
```javascript
const oneAsset = {path:"../cats.png",frames:4}; (Image with dimensions of 1024 x 64)
```

**Input(Multiple)**
```javascript
const manyAssets = [
  {path:"../cats.png",frames:4,animations:[{name:"cat1",start:1,end:5}]}, //with animations
  {path:"../dogs.png",frames:7} //without animations,
  {path:"lizards.png",frames:15,name:"blue-lizards"} //change output name (defaults to image name)
  {path:"../birds.png",frames:11,dir:"asset/images"} //output to different directory (defaults to the images directory)
];
```
**Writing(.json)**
```javascript
const manifestGen = require('pixi-texture-manifest-gen');

manifestGen.write(oneAsset);
manifestGen.writeMany(manyAssets);
```

**Generating(Object)**
```javascript
const manifestGen = require('pixi-texture-manifest-gen');

const manifest = manifestGen.generate(asset);
const manifests = manifestGen.generateMany(assets);
```

