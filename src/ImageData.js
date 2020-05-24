const Frame = require('./model/Frame');
const Meta = require('./model/Meta');
const Animations = require('./model/Animations');
const path = require('path');

class ImageData{
    constructor(asset){
        this.path = asset.path;
        this.w = asset.img.width;
        this.h = asset.img.height;
        this.col = asset.col;
        this.row = asset.row;
        this.animations = asset.animations;
        this.scale = asset.scale;
    }
    getName(){
        return this.path.split('\\').pop().split('/').pop();
    }
    getExtension(){
        const name = this.getName();
        return name.split('.')[1];
    }
    getDirectory(){
        return path.dirname(this.path);
    }
    getBase(){
        const name = this.getName();
        return name.split('.')[0];
    }
    getMeta(){
        const name = this.getName();
        return new Meta(name,this.w,this.h,this.scale);
    }
    getAnimations(){
        let animations = new Animations();
        let animation;
        this.animations.forEach((range)=>{
            animation = this.getAnimation(range.start,range.end);
            animations.add(range.name,animation);
        });
        return animations;
    }
    getAnimation(frameStart,frameEnd){
        const animation = [];
        let baseName = this.getBase();

        let name;
        for(let i = frameStart; i <= frameEnd; i++){
            name = baseName+"-"+i;
            animation.push(name);
        }

        return animation;
    }
    getFrameCount(){
        return this.col * this.row;
    }
    getFrameWidth(){
        return this.w / this.col;
    }
    getFrameHeight(){
        return this.h / this.row;
    }
    getFrames(){
        let frames = {};
        const frameW = this.getFrameWidth();
        const frameH = this.getFrameHeight();

        let y;
        let x;
        let name;
        let col;
        let row;
        let frameCount = 1;

        for(let j = 1; j <= this.row; j++){
            for(let i = 1; i <= this.col; i++) {
                row = j;
                col = i;
                name = `${this.getBase()}-${frameCount}`;
                x = ((frameW * col) - frameW);
                y = (row * frameH);
                frames[name] = new Frame(x,y,frameW,frameH);
                frameCount++;
            }
        }

        return frames;
    }

}
module.exports = ImageData;