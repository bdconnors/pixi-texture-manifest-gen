class Frame{
    constructor(x,y,w,h,rotated = false,trimmed = false){
        this.frame = {x:x,y:y,w:w,h:h};
        this.rotated = rotated;
        this.trimmed = trimmed;
        this.spriteSourceSize = {x:x,y:y,w:w,h:h};
        this.sourceSize = {w:w,h:h};
    }
}
module.exports = Frame;