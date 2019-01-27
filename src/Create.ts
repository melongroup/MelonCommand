import { confirm, doCommand, Core, getTSConfig, $path } from "./Core";
import { LOG_COLOR, debugLog } from "./Debug";
import { File } from "./File";
import { debuglog } from "util";

export async function createProject(){
    //todo; 
    // let createType = Core.config.web ? "web" : "nodejs";
    // let data = await doCommand("echo 吃不下了也要吃");
    // console.log(data);

    let file = new File( $path.resolve("./") );
    if(file.getDirectoryListing().length > 3){
        let msg = `${LOG_COLOR.RED}${file.nativePath} not empty Folder!${LOG_COLOR.WHITE}`
        console.log(msg);
        return;
    }


    
    let data = await confirm(`${LOG_COLOR.BOLD}${LOG_COLOR.BLUE}create project\r\n  ${LOG_COLOR.GREEN}1:web < default\r\n  ${LOG_COLOR.WHITE}2:nodejs\r\ninput:`);

    switch(data){
        case "1":

        break;
        case "2":
            debugLog("copy files");
            console.log(`xcopy ${Core.remotePath}project\\nodejs\\* ${file.nativePath.replace(/\//g,"\\")} /s /e /h /r /k /y /d`);
            await doCommand(`xcopy ${Core.remotePath}project\\nodejs\\* ${file.nativePath.replace(/\//g,"\\")} /s /e /h /r /k /y /d`);
            debugLog("update engine");
            await doCommand(`melon u`);
            debugLog("install packages ,maybe use 30s");
            await doCommand(`cnpm i`);
        break;
    }

    debugLog(`${LOG_COLOR.GREEN}create Complete,type "tsc" to Compiler${LOG_COLOR.WHITE}`);

    
}