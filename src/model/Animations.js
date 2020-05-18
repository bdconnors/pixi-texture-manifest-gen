class Animations{
    constructor(){}
    add(name,frameNames){
        this[name] = frameNames;
    }
    size(){
        return Object.keys(this).length;
    }
}
module.exports = Animations;