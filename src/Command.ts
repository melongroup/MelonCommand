require("./lib/stage3d.js");
require("./lib/wechat.js");
require("./lib/zlib.min.js"); 

import { $path, Core, IArgs } from "./Core";
import { createProject } from "./Create";
import { updateVersion, checkVersion, updateEngine } from "./Update";
import { File } from "./File";
import { referenceJs } from "./Index";



function convertParam(str:string){
    while(str.charAt(0) == "-"){
        str = str.slice(1);
    }
    return str;
}

function convertArgv(argv:string[]){
    var o = {};
    for (let i = 2; i < argv.length; i++) {
        const key = argv[i];
        if(key.indexOf("--") == 0){
            let value = argv[i+1];
            if(value && value.indexOf("-") != 0){
                o[convertParam(key)] = value;
                i += 1;
            }else{
                o[convertParam(key)] = true;
            }
        }else{
            o[convertParam(key)] = true;
        }
    }
    return o;
}


async function main(){


    var config = Core.config = convertArgv(process.argv) as IArgs;


    let needUpdateVersion = checkVersion();
    

    if(config.setup){
        if(needUpdateVersion){
            await updateVersion();
        }else{
            console.log("it's last version now") 
        }

        return;
    }

    if(needUpdateVersion){
        console.log("find new Melon version! please update by command 'melon setup'");
        return;
    }

    if(config.u || config.update){
        await updateEngine();
        return;
    }

    if(config.v || config.version){
        let version = new File(process.env.APPDATA + "\\npm\\node_modules\\melon\\version.txt").readUTF8().trim();
        console.log("version:"+version);
        return;
    }
    
    if(config.create){
        await createProject();
        return;
    }
    
    if(config.c || config.compiler){

    }


    referenceJs();

    
    // console.log($path.resolve(""));
}

main();





