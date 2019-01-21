import { IArgs, Core } from "./Core";
import { createProject } from "./Create";

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
    if(config.create){
        await createProject()
    }
}

main();





