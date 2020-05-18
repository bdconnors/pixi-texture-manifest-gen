class Manifest{
    constructor(frames,animations,meta){
        this.frames = frames;
        if(animations.size() > 0){this.animations = animations;}
        this.meta = meta;
    }
}
module.exports = Manifest;