const Frame = require('./model/Frame');
const Meta = require('./model/Meta');
const Animations = require('./model/Animations');
const path = require('path');

class ImageData{
    constructor(src,w,h,count,animations,scale){
        this.path = src;
        this.w = w;
        this.h = h;
        this.count = count;
        this.animations = animations;
        this.scale = scale;
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
    getFrames(){
        const frames = [];
        const baseName = this.getBase();
        const width = this.w / this.count;
        const height = this.h;
        const y = 0;

        let x;
        let name;
        let frame;

        for(let i = 0; i < this.count; i++){
            x = width * i;
            name = baseName +"-"+(i+1);
            frame = new Frame(x,y,width,height);
            frames.push(frame);
        }
        return frames;
    }

}
module.exports = ImageData;