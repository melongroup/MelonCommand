require("./lib/stage3d.js");
require("./lib/wechat.js");
require("./lib/zlib.min.js"); 

import { $path, Core, IArgs } from "./Core";
import { createProject } from "./Create";
import { updateVersion, checkVersion, updateEngine } from "./Update";
import { File } from "./File";
import { referenceJs } from "./Index";
import { releaseProject, publishProject } from "./Publish";
import { LOG_COLOR } from "./Debug";



function convertParam(str:string){
    while(str.charAt(0) == "-"){
        str = str.slice(1);
    }
    return str;
}

function convertArgv(argv:string[]){
    var o = {params:[]};
    for (let i = 2; i < argv.length; i++) {
        const key = argv[i];
        let convertKey = convertParam(key)
        if(key.indexOf("--") == 0){
            let value = argv[i+1];
            if(value && value.indexOf("-") != 0){
                o[convertKey] = value;
                i += 1;
            }else{
                o[convertKey] = true;
            }
        }else{
            o[convertKey] = true;
            o.params.push(convertKey);
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
        console.log(`find new Melon version! please update by command '${LOG_COLOR.GREEN}melon setup${LOG_COLOR.WHITE}'`);
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
    
    if(config.create || config.c){
        await createProject();
        return;
    }

    if(config.release || config.r){
        await releaseProject();
        return;
    }

    if(config.p || config.publish){
        await publishProject();
        return;
    }


    if(config.h || config.help){
        console.log(`current version:${new File(process.env.APPDATA + "\\npm\\node_modules\\melon\\version.txt").readUTF8().trim()}`)
        console.log(`   melon          --编译生成html文件`)
        console.log(`   melon setup    --更新melon编译库`)
        console.log(`   melon update   --更新stage3d wechat 等lib库`)
        console.log(`   melon create   --创建web nodejs项目`)
        console.log(`   melon release  --发布release版本`)
        console.log(`   melon publish  --发布release版本到内网测试服务器`)
        return;
    }
    
    referenceJs();
    // console.log($path.resolve(""));
}

main();





