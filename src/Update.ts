import { File } from "./File";
import { Core, doCommand, getTSConfig } from "./Core";

export function checkVersion(){
    let localFile = new File(process.env.APPDATA + "\\npm\\node_modules\\melon\\version.txt").readUTF8().trim();
    let removeFile = new File(Core.remotePath + "node_modules\\melon\\version.txt").readUTF8().trim();
    return localFile != removeFile;
}

export async function updateVersion(){
    var root = process.env.APPDATA + "\\npm\\";
    await doCommand(`xcopy ${Core.remotePath}* ${root} /s /e /h /r /k /y /d`);
    console.log("melon update complete");
}

export async function updateEngine(){
    let shareRoot = "\\\\192.168.1.4\\webgl\\engine\\trunk";

    let ts = getTSConfig();
    if(ts.templete){
        await doCommand(`xcopy ${shareRoot}\\web\\* "bin-debug\\lib\\" /s /e /h /r /k /y /d`);
    }else{
        await doCommand(`xcopy ${shareRoot}\\nodejs\\* "dest\\lib\\" /s /e /h /r /k /y /d`);
    }

    await doCommand(`xcopy ${shareRoot}\\types\\* "lib\\" /s /e /h /r /k /y /d`);
    console.log("engine update complete");
}