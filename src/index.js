const fs = require('fs');
const imageSize = require('image-size');
const ImageData = require('./ImageData');
const Manifest = require('./model').Manifest;


function makeImageData(asset){
    let animations = [];
    let scale = 1;
    const dimensions = imageSize(asset.path);
    const path = asset.path;
    const width = dimensions.width;
    const height = dimensions.height;
    const frames = asset.frames;
    if(asset.animations){animations = asset.animations;}
    if(asset.scale){scale = asset.scale;}

    return new ImageData(path,width,height,frames,animations,scale);
}
function makeManifest(imageData){
    const frames = imageData.getFrames();
    const animations = imageData.getAnimations();
    const meta = imageData.getMeta();

    return new Manifest(frames,animations,meta);
}
function write(asset,cb){

    const imageData = makeImageData(asset);
    const manifest = makeManifest(imageData);
    const data = JSON.stringify(manifest, null,'\t');

    let dir = imageData.getDirectory();
    let name = imageData.getBase();

    if(asset.name){name = asset.name;}
    if(asset.dir){dir = asset.dir;}

    name += ".json";
    dir += "/";
    dir += name;

    fs.writeFile(dir,data,(err)=>{
        if(err){cb(err);}
    });
}
function generate(asset){
    const imageData = makeImageData(asset);
    return makeManifest(imageData);
}
function writeMany(assets,cb){
    assets.forEach((asset)=>{
        write(asset,(err)=>{
            if(err){cb(err);}
        });
    });
}
function generateMany(assets){
    const results = [];
    let manifest;
    assets.forEach((asset)=>{
        manifest = generate(asset);
        results.push(manifest);
    });
    return results;
}
module.exports.makeImageData = makeImageData;
module.exports.makeManifest = makeManifest;
module.exports.writeMany = writeMany;
module.exports.generateMany = generateMany;
module.exports.write = write;
module.exports.generate = generate;