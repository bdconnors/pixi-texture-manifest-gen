const fs = require('fs');
const ManifestBuilder = require('./src/builder/ManifestBuilder');

function generate(path,frameCount,animated = false){
    const builder = new ManifestBuilder();
    return builder.build(path, frameCount, animated);
}

function write(name,manifest){
    const fileName = name+".json";
    const data = JSON.stringify(manifest, null,'\t');
    fs.writeFile(fileName,data,(err)=>{
        if(err){console.log(err);}
        console.log(`Manifest ${name}.json created`);
    });
}


module.exports.generate = generate;
module.exports.write = write;