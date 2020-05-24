# pixi-texture-manifest-gen
generates json manifest files for use with pixi.js

**Input(Single)**
```javascript
const oneAsset = {path:"../cats.png",col:1,row:1}; //one column one row
```

**Input(Multiple)**
```javascript
const manyAssets = [
  {path:"../cats.png",col:1,row:1,animations:[{name:"cat1",start:1,end:5}]}, //with animations
  {path:"../dogs.png",col:6,row:4}, //without animations,
  {path:"lizards.png",col:2,row:4}, //change output name (defaults to image name)
  {path:"../birds.png",col:4,row:4,dir:"asset/images"} //output to different directory (defaults to the images directory)
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

