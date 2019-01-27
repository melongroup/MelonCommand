import { File } from "./File";
import { Core, doCommand, getTSConfig } from "./Core";

export function checkVersion(){
    let localFile = new File(process.env.APPDATA + "\\npm\\node_modules\\melon\\version.txt").readUTF8().trim();
    let removeFile = new File(Core.remoteMelon + "node_modules\\melon\\version.txt").readUTF8().trim();
    return localFile != removeFile;
}

export async function updateVersion(){
    var root = process.env.APPDATA + "\\npm\\";
    await doCommand(`xcopy ${Core.remoteMelon}* ${root} /s /e /h /r /k /y /d`);
    console.log("melon update complete");
}

export async function updateEngine(){
    let shareRoot = Core.remotePath + "\\engine\\trunk";

    let ts = getTSConfig();
    if(ts.templete){
        await doCommand(`xcopy ${shareRoot}\\web\\* "bin-debug\\lib\\" /s /e /h /r /k /y /d`);
        let f = new File(ts.root).resolvePath("js");
        if(f.exists){
            await doCommand(`xcopy ${f.nativePath.replace(/\//g,"\\")}*.js "bin-debug\\lib\\" /s /e /h /r /k /y /d`);
        }
    }else{
        await doCommand(`xcopy ${shareRoot}\\nodejs\\* "dest\\lib\\" /s /e /h /r /k /y /d`);
    }

    await doCommand(`xcopy ${shareRoot}\\types\\* "lib\\" /s /e /h /r /k /y /d`);

    
    console.log("engine update complete");
}