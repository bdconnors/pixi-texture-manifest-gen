class Meta{
    constructor(image,w,h,scale = 1){
        this.image = image;
        this.size = {w:w,h:h};
        this.scale = scale;
    }
}
module.exports = Meta;