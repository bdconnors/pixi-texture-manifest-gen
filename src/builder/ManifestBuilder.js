const imageSize = require('image-size');

class ManifestBuilder{
    constructor(){
        this.manifest = {}
    }
    build(path,frameCount,animated = false){
        const imageInfo = this.parseImage(path);
        const frameInfo = this.parseFrames(imageInfo,frameCount);

        this.buildFrames(imageInfo.name,frameInfo.count,frameInfo.width,frameInfo.height);

        if(animated){this.buildAnimations(imageInfo.name);}

        this.buildMeta(imageInfo.file,imageInfo.width,imageInfo.height);

        return this.manifest;
    }
    buildFrames(name,count,width,height){
        this.manifest.frames = {};
        let x;
        let frameNum;
        let frameName;
        for(let i = 0; i < count; i++){
            x = width * i;
            frameNum = i + 1;
            frameName = name+"-"+frameNum;
            this.manifest.frames[frameName] = {
                frame: {x:x,y:0,w:width,h:height},
                rotated: false,
                trimmed: false,
                spriteSourceSize: {x:0,y:0,w:width,h:height},
                sourceSize: {w:width,h:height}
            }
        }
    }
    buildAnimations(name){
        this.manifest.animations = {};
        this.manifest.animations[name] = [];
        Object.keys(this.manifest.frames).map((key)=>{
            this.manifest.animations[name].push(key);
        });
    }
    buildMeta(file,width,height){
        this.manifest.meta = {};
        this.manifest.meta.image = file;
        this.manifest.meta.size = {w:width,h:height};
        this.manifest.meta.scale = 1;
    }
    parseFrames(image,frameCount){
        let frames = {};
        frames.count = frameCount;
        frames.width = image.width / frameCount;
        frames.height = image.height;
        return frames;
    }
    parseImage(path){
        let image = {};
        const size = imageSize(path);
        image.file = path.split('\\').pop().split('/').pop();
        image.name = image.file.split(".")[0];
        image.width = size.width;
        image.height = size.height;
        image.ext = size.type;
        return image;
    }
}
module.exports = ManifestBuilder;