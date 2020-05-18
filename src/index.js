const fs = require('fs');
const imageSize = require('image-size');
const ImageData = require('./ImageData');
const Manifest = require('./model').Manifest;


function makeImageData(path,frameCount,animationSettings = [],scale = 1){
    const dimensions = imageSize(path);
    return new ImageData(path,dimensions.width,dimensions.height,frameCount,animationSettings,scale);
}
function makeManifest(imageData){
    const frames = imageData.getFrames();
    const animations = imageData.getAnimations();
    const meta = imageData.getMeta();
    return new Manifest(frames,animations,meta);
}
function write(name,manifest,dir = ""){
    const fileName = name+".json";
    const output = dir+fileName;
    const data = JSON.stringify(manifest, null,'\t');
    fs.writeFile(output,data,(err)=>{
        if(err){console.log(err);}
        console.log(`Manifest ${name}.json created`);
    });
}

const imageData = makeImageData("../arch-atk.png",14,[{name:"atk",start:1,end:14}]);
const manifest = makeManifest(imageData);
write("arch-atk",manifest,'../');

module.exports.makeImageData = makeImageData;
module.exports.makeManifest = makeManifest;
module.exports.write = write;