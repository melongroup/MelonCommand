import { exec } from "child_process";
import { File, __path } from "./File";


async function doCommand(cmd:string) {
    return new Promise(resolve => {
        exec(cmd, { encoding: 'buffer' }, (error, stdout) => {
            // let err = new TextDecoder("gbk").decode(stdout);
            resolve([error, stdout]);
        });
    });
}

async function setup(){

    var isWin = /^win/.test(process.platform);
 
    if(isWin){
        let root = process.env.APPDATA + "\\npm\\";
        await doCommand("xcopy bin-release\\* "+root+" /s /e /h /r /k /y /d");
    }
}

setup();

