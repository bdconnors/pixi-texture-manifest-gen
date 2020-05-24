const fs = require('fs');
const imageSize = require('image-size');
const ImageData = require('./ImageData');
const Manifest = require('./model').Manifest;


function makeImageData(asset){
    asset.img = imageSize(asset.path);
    console.log(asset.img);
    if(!(asset.animations)){asset.animations = []}
    if(!(asset.scale)){asset.scale = 1;}

    return new ImageData(asset);
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