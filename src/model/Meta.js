class Meta{
    constructor(file,w,h,scale){
        this.image = file;
        this.size = {w:w,h:h};
        this.scale = scale;
    }
}
module.exports = Meta;