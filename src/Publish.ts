import { getTSConfig, getCompilerFiles, TSCompilerOptions, TSConfigOptions, doCommand, loger, xCopy, Core } from "./Core";
import { File } from "./File";
import { updateIndexHtml, copyAssetFile } from "./Index";


export function compilerGetCommand(list:string[],ts:TSConfigOptions,name:string,declaration:boolean){
    let compileparams:string[];

    let compilerCompiler = ts.compilerOptions;

    compileparams = ["target","module","sourceMap","rootDir","lib" ,"declaration"];    


    compileparams.push("outFile");
    compilerCompiler.outFile = new File(ts.root).resolvePath("bin-release/"+name).nativePath;
    compilerCompiler.module = "amd";
    compilerCompiler.sourceMap = false;
    compilerCompiler.declaration = declaration;
   
    let compilekey = "";
    compileparams.forEach(element => {
        let key = compilerCompiler[element];
        if(key != undefined){
            if(key instanceof Array){
                key = key.join(",");
            }
            compilekey += `--${element} ${key} `;
        }
    });

    return `tsc  ${compilekey} --removeComments --watch false`;


}


export async function releaseProject(){

    let ts = getTSConfig();

    if(!ts){
        return;
    }

    let {name,mini,d,nohtml} = Core.config;

    if(ts.templete==undefined && !nohtml){
        loger("cann't release nodejs project ");
        return;
    }


    let list = getCompilerFiles(ts);
    let thisdir = new File(ts.root);

    if(!name){
        name = "game.js"
    }
    
    let cmd = compilerGetCommand(list,ts,name,d);
    let cmdfile = thisdir.resolvePath("tmp.cmd");
    cmd = `@echo off\ncd ${thisdir.nativePath}\n${cmd}`
    cmdfile.writeUTF8(cmd);

    let time = new Date().getTime();

    let r = await doCommand("tmp");

    cmdfile.delete()

    if(r[0]){
        loger("error:"+r)
    }else{
        loger(`compile Complete! ${list.length} files use ${new Date().getTime() - time}ms`);
        if(nohtml == false){
            let out = new File(ts.root).resolvePath("bin-release/index.html");
            updateIndexHtml(ts,[name],out);
        }
    }

    let libFile = thisdir.resolvePath(ts.compilerOptions.outDir+"lib/");

    if(libFile.exists){
        cmd = `xcopy ${thisdir.resolvePath(ts.compilerOptions.outDir+"lib/").nativePath.replace(/\//g,"\\")+"*"} ${thisdir.resolvePath("bin-release/lib/").nativePath.replace(/\//g,"\\")}  /s /e /h /r /k /y /d `
        r = await doCommand(cmd);
        if(r[0]){
            loger("error:"+r)
            return;
        }
    }

    let root = thisdir.resolvePath("bin-release/");

    copyAssetFile(root.nativePath.replace(/\//g,"\\"));

    if(mini){
        let jslist = root.getAllFiles(".js",2);

        for (let i = 0; i < jslist.length; i++) {
            const f = jslist[i];
            await doCommand(`uglifyjs ${f.nativePath} -m -o ${f.nativePath}`);
        }
    }

}


export async function publishProject(){

    let ts = getTSConfig();

    if(!ts){
        loger("no tsconfig.json");
        return;
    }

    if(!ts.clientRemote){
        loger("no clientRemote path in tsconfig.json");
        return;
    }

    let thisdir = new File(ts.root);

    let [state,value] = await doCommand("git branch") as string[];
    if(!state){
        let [,branch] = /\* (.*?)\n/.exec(value) as string[];

        let from = thisdir.resolvePath("bin-release");

        let to = `${ts.clientRemote}\\${branch}\\`

        await xCopy( from.nativePath , to , true );

    }


}