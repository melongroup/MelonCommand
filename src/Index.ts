import { getTSConfig, getCompilerFiles, compiler_checkAvailable, TSConfigOptions, $path, doCommand, xCopy } from "./Core";

import { File } from "./File";

export function referenceJs(){
    var ts = getTSConfig();

    if(!ts){
        return;
    }


    let assetsPath:string;

    let{platform} = ts


    let list = getCompilerFiles(ts);
    console.log(`${list.length}个文件`);

    if(platform == "web"){
        updateIndexJson(ts,list);
    }else{
        if(ts.templete){
            //web项目
            let out = updateIndexHtml(ts,list);
            if(out.nativePath.indexOf("D:/workspace_ts/") == 0){
                console.log(`测试地址: ${out.nativePath.replace("D:/workspace_ts/","http://127.0.0.1/ts/")}`);
            }
            assetsPath = $path.resolve("bin-debug/")
        }else{
            assetsPath = $path.resolve("dest/");
        }
    }
    

    let file = new File($path.resolve("root"));
    if(file.exists && !file.isFile()){
        xCopy(file.nativePath,assetsPath + "/");
    }


    file = new File($path.resolve("assets"));
    if(file.exists && !file.isFile()){
        xCopy(file.nativePath,assetsPath + "/assets/");
    }

    file = new File($path.resolve("js"));
    if(file.exists && !file.isFile()){
        xCopy(file.nativePath,assetsPath + "/lib/");
    }
    
    
}



export function updateIndexHtml(ts:TSConfigOptions,list:string[],out?:File){
    if(ts.templete){
        let file = new File(ts.root).resolvePath(ts.templete);
        let contents = "";
        if(file.exists){
            let len = list.length;
            for(let i = 0;i<len;i++){
                let filename = list[i];
                if(compiler_checkAvailable(filename,ts.exclude)){
                    continue;
                }
                filename = filename.replace(".ts", ".js");
                filename = filename.replace("src/", "");
                contents += "        <script src='" + filename + "'></script>\r\n";
            }
            let str = file.readUTF8();
            let s1 = "<!--auto-->";
            let s2 = "<!--autoend-->";
            let si = str.indexOf(s1);
            let se = str.indexOf(s2);
            if(si == -1 || se == -1){
                return;
            }
            str = str.replace(str.slice(si,se+s2.length),`${s1}\n${contents}        ${s2}`);

            if(!out){
                out = new File(ts.root).resolvePath(ts.compilerOptions.outDir+"index.html");
            }

            out.writeUTF8(str);
            console.log(`成功生成index.html ${out.nativePath}`);

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
