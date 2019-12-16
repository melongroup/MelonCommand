import { compiler_checkAvailable, Core, getCompilerFiles, getTSConfig, TSConfigOptions, xCopy } from "../core/Core";
import { File } from "../core/File";


export function copyAssetFile(assetsPath:string){
    let cmdpath = Core.cmdPath;
    let file = cmdpath.resolvePath("root");
    if(file.exists && !file.isFile()){
        xCopy(file.nativePath,assetsPath + "/");
    }


    file = cmdpath.resolvePath("assets")
    if(file.exists && !file.isFile()){
        xCopy(file.nativePath,assetsPath + "/assets/");
    }

    // file = cmdpath.resolvePath("js");
    // new File($path.resolve("js"));
    // if(file.exists && !file.isFile()){
    //     xCopy(file.nativePath,assetsPath + "/lib/");
    // }
}

export function referenceJs(){
    var ts = getTSConfig();

    if(!ts){
        return;
    }


    let assetsPath:string;

    let{platform} = ts


    let list = getCompilerFiles(ts);
    console.log(`${list.length}个文件`);

    assetsPath = Core.cmdPath.resolvePath(ts.compilerOptions.outDir).nativePath

    if(platform == "web"){
        updateIndexJson(ts,list);
    }else{
        if(ts.templete){
            //web项目
            let out = updateIndexHtml(ts,list);
            // if(out.nativePath.indexOf("D:/workspace/") == 0){
            //     console.log(`测试地址: ${out.nativePath.replace("D:/workspace/","http://127.0.0.1/")}`);
            // }
        }else{
            assetsPath = Core.cmdPath.resolvePath("dest/").nativePath;
        }
    }

    let file =  Core.cmdPath.resolvePath("root");
    if(file.exists && !file.isFile()){
        xCopy(file.nativePath,assetsPath + "/");
    }

    if(ts.templete == undefined){
        copyAssetFile(assetsPath);
    }
    
}



export function updateIndexHtml(ts:TSConfigOptions,list:string[],out?:File){
    if(ts.templete){
        let file = new File(ts.root).resolvePath(ts.templete);
        let contents = "";
        if(file.exists){

            let len = list.length;

            if(["commonjs","amd"].indexOf(ts.compilerOptions.module) != -1){
                for(let i = 0;i<len;i++){
                    let filename = list[i];
                    // console.log(filename,ts.main);
                    if(compiler_checkAvailable(filename,ts.exclude)){
                        continue;
                    }
                    filename = filename.replace(".ts", ".js");
                    filename = filename.replace("src/", "");
                    // if(filename == ts.main){
                    //     continue;
                    // }
                    contents += "        <script src='" + filename + "'></script>\r\n";
                }
            }else{
                if(ts.main){
                    contents += "        <script type=\"module\"  src='" + ts.main + "'></script>\r\n";
                }
            }


            // console.log(contents);

            let str = file.readUTF8();
            let s1 = "<!--auto-->";
            let s2 = "<!--autoend-->";
            let si = str.indexOf(s1);
            let se = str.indexOf(s2);
            if(si != -1 && se != -1){
                str = str.replace(str.slice(si,se+s2.length),`${s1}\n${contents}        ${s2}`);
            }

            if("amd" == ts.compilerOptions.module){
                str =str.replace(/\.\.\/assets\//g,"./assets/");
            }
            

            if(!out){
                out = new File(ts.root).resolvePath(ts.compilerOptions.outDir+"index.html");
            }

            out.writeUTF8(str);
            console.log(`成功生成index.html ${out.nativePath}`);

            let workspace = Core.globalConfig.workspace

            if(out.nativePath.indexOf(workspace) == 0){
                console.log(`测试地址: ${out.nativePath.replace(workspace,"http://127.0.0.1")}`);
            }

            return out;

        }

        return undefined;
    }
}

export function updateIndexJson(ts:TSConfigOptions,list:string[]){

    let file = new File(ts.root).resolvePath(ts.compilerOptions.outDir+"js.json");
    let result = [] as string[]
    let len = list.length;
    for(let i = 0;i<len;i++){
        let filename = list[i];
        if(compiler_checkAvailable(filename,ts.exclude)){
            continue;
        }
        filename = filename.replace(".ts", ".js");
        filename = filename.replace("src/", "");
        result.push(filename);
    }
    file.writeUTF8(JSON.stringify(result));

    if(ts.templete){
        file = new File(ts.root).resolvePath(ts.templete);
        if(file.exists){
            file.copyto(new File(ts.root).resolvePath(ts.compilerOptions.outDir+"index.html"));
        }
    }

    console.log(`成功生成 js.json ${file.nativePath}`);

}
