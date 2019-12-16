import { File, __path } from "../core/File";
import { Core, doCommand, getTSConfig, getBranch, xCopy } from "../core/Core";

export function checkVersion(){

    // let cfg = new File(process.env.APPDATA + "\\npm\\node_modules\\melon\\cfg.txt").readUTF8();
    // if(cfg.indexOf("type=local") != -1){
    //     return false;
    // }
    let localFile = Core.binPath.resolvePath("\\node_modules\\melon\\version.txt").readUTF8().trim();
    // let localFile = new File(process.env.APPDATA + "\\npm\\node_modules\\melon\\version.txt").readUTF8().trim();
    let removeFile = Core.remoteMelon.resolvePath("node_modules\\melon\\version.txt").readUTF8().trim();
    return localFile != removeFile;
}

export async function updateVersion(){
    // var root = process.env.APPDATA + "\\npm\\";
    xCopy(Core.remoteMelon.nativePath , Core.binPath.nativePath);
    console.log("melon update complete");
}

export async function updateEngine(){

    let ts = getTSConfig();

    let engine = ts.engine;

    if(engine){
        let{remote,files}=engine;
        if(remote && files.length){
            let branch = await getBranch();
            remote = __path.resolve(remote+branch).replace("/","\\");

            let file = new File(__path.resolve("assets/js"));
            file.mkdir();

            file = new File(__path.resolve("lib"));
            file.mkdir();

            for (let i = 0; i < files.length; i++) {
                let element = files[i] + ".js";
                await doCommand(`copy ${remote}\\${element} assets\\js\\${element} /y`);

                element = files[i] + ".d.ts";
                await doCommand(`copy ${remote}\\${element} lib\\${element} /y`);
            }
        }

    }else{
        let shareRoot = Core.remotePath + "\\engine\\trunk";
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
    }

   

    
    console.log("engine update complete");

}