///<reference path="./File.ts" />

import { $path, doCommand, TSConfigOptions } from "./Core";
import { File } from "./File";
export interface TSCompilerOptions{
    target:string;
    module:string;

    outDir:string;
    rootDir:string;
    outFile:string;

    lib:string[];

    sourceMap:boolean;
    declaration:boolean;
}



export var textarea:HTMLTextAreaElement;


/**************************************时间格式化处理************************************/
export function dateFtt(fmt,date)   
{ //author: meizz   
    var o = {   
        "M+" : date.getMonth()+1,                 //月份   
        "d+" : date.getDate(),                    //日   
        "h+" : date.getHours(),                   //小时   
        "m+" : date.getMinutes(),                 //分   
        "s+" : date.getSeconds(),                 //秒   
        "q+" : Math.floor((date.getMonth()+3)/3), //季度   
        "S"  : date.getMilliseconds()             //毫秒   
    };   
    if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
    for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
    return fmt;   
}



export var logs:string[] = [];

export function loger(msg:string){
    // textarea = document.getElementById("info") as HTMLTextAreaElement;
    // logs.push(`${ dateFtt("[hh:mm:ss]",new Date()) } ${msg}`);
    // var msgs = logs
    // if(logs.length > 100){
    //     msgs = logs.slice(logs.length - 100);
    // }
    // textarea.value = msgs.join("\n");
    // let{scrollHeight,clientHeight}=textarea;
    // textarea.scrollTop =  scrollHeight - clientHeight;

    console.log(msg);
}


export function removeComments(content:string){
    var reg1 = /\/\/.*/g;
    var r=content.replace(reg1, '');
    var reg2 = /\/\*[\s\S]*?\*\/[^\*]/g;
    r = r.replace(reg2, '');
    return r;
}


export interface CompilerOption{
    root : string;
    jsperfix?:string;
    name? : string;
    amd? : boolean;
}


export function compilerCompiler(){
    let config = {} as CompilerOption;
    config.root = "compile/";
    config.name = "compile";
    config.amd = false;

    compile(config)
}


export function compilerWechat(){
    let config = {} as CompilerOption;
    config.root = "wechat/";
    config.name = "wechat";
    config.amd = true;
    compile(config)
}



export async function compile(option:CompilerOption){
    rf.FileReference.CLS = File;
    var thisdir = new File($path.resolve(""));
    var root = new File($path.resolve(option.root));
    var tsconfig = root.resolvePath("tsconfig.json");
    loger(`compile path:${tsconfig.nativePath}`);

    //加载config
    var ts = JSON.parse(removeComments(tsconfig.readUTF8())) as TSConfigOptions;
    ts.root = root.nativePath;

    if(option.amd == true){
        ts.compilerOptions.outFile = "../bin-debug/" + option.name + ".js";
        ts.compilerOptions.module = "amd";
    }

    //获得所有可编译的文件
    let list = getCompilerFiles(ts);
    //编译
    let cmd = compilerGetCommand(list,ts.compilerOptions);
    let cmdfile = thisdir.resolvePath("tmp.cmd");
    cmd = `@echo off\ncd ${root.nativePath}\n${cmd}`
    cmdfile.writeUTF8(cmd);

    let time = new Date().getTime();

    let r = await doCommand("tmp");
    if(r[0]){
        loger("error:"+r)
    }else{
        loger(`compile Complete! ${list.length} files use ${new Date().getTime() - time}ms`);
    }

    //copy  .d.ts

    if(true == option.amd){
        let file = root.resolvePath(ts.compilerOptions.outFile.replace(".js",".d.ts"));
        if(file.exists){
            file.moveto(thisdir.resolvePath(`lib/${file.name}`));
        }
    }

    //index.html

    if(ts.platform){
        
    }


    if(ts.templete){
        let file = root.resolvePath(ts.templete);
        let contents = "";
        if(file.exists){

            let{jsperfix} = option;
            if(!jsperfix){
                jsperfix = ""
            }

            let len = list.length;
            for(let i = 0;i<len;i++){
                let filename = list[i];

                if(compiler_checkAvailable(filename,ts.exclude)){
                    continue;
                }

                if(filename.indexOf(".d.ts") != -1){
                    continue;
                }
                filename = filename.replace(".ts", ".js");
                filename = filename.replace("src/", "");
                contents += "        <script src='" + jsperfix + filename + "'></script>\r\n";
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
            file.writeUTF8(str);
        }
    }
    
    

    
}


// export async function readFile(path:string){
//     return await new Promise(resolve => {
//         fs.readFile( path , 'utf-8' , function(err, data) {
//             resolve(data);
//         });
//     });
// }






export var referenceMatch = /\/\/\/ <reference path=\"(.*?)\"/g;


export function getReference(files:File[],ts:TSConfigOptions) {
    referenceMatch = /reference path=\"(.*?)\"/;
    var fileobj = {};
    var reference:string[] = [];
    for (var i = 0; i < files.length; i++) {
        var relativepath = files[i];
        var content = relativepath.readUTF8();
        var arr = fileobj[relativepath.nativePath] = [];
        while (true) {
            var match = referenceMatch.exec(content);
            if (match) {
                content = content.replace(match[0], "");
                let filepath =  relativepath.resolvePath(match[1]);
                arr.push(filepath);
            }else{
                break;
            }
        }
    }

    var key;

    var processes = [];
    function process(arr:File[]) {
        for (var i = 0; i < arr.length; i++) {
            let f = arr[i];
            var key = f.nativePath;
            if (processes.indexOf(key) == -1) {
                processes.push(key);
                if (reference.indexOf(key) == -1) {
                    if (undefined != fileobj[key]) {
                        process(fileobj[key]);
                    }
                    reference.push(key.replace(ts.root,""));
                }
            }
        }
    }

    process(files);

    return reference;
};



export function compiler_checkAvailable(target:string,assets:string[]){
    var file;
    target = target.toLocaleLowerCase();
    for(file of assets){
        var i = target.indexOf(file[0]);
        if(i == -1){
            continue;
        }

        if(file[1] == 1){
            return true;
        }
        var path = target.slice(i+1);
        if(path.lastIndexOf("/") == -1){
            return true;
        }
    }
    return false;
}


export function getCompilerFiles(ts:TSConfigOptions){
    let{compilerOptions,include,exclude} = ts;

    function formatAssets(assets:string[]){
        var r = [];
        var i
        var file
        for (file of assets) {
            i = file.indexOf("/**/*");
            if(i != -1){
                r.push([$path.resolve(file.slice(0,i+1)).replace(/\\/g,"/").toLowerCase(),1]);
            }else{
                if((i = file.lastIndexOf("*")) == file.length-1){
                    r.push([$path.resolve(file.slice(0,i)).replace(/\\/g,"/").toLowerCase(),2]);
                }else{
                    r.push([(file).replace(/\\/g,"/").toLowerCase(),3]);
                }
            }
        }
        return r;
    }


    

    ts.exclude = exclude = formatAssets(exclude);
    let list =  new File(ts.root).resolvePath(compilerOptions.rootDir).getAllFiles();
    let result:File[] = [];
    list.forEach(element => {
        if(element.extname == ".ts"){
            var b = compiler_checkAvailable(element.nativePath,exclude);
            if(false == b){
                result.push(element);
            }
        }
    });

    return getReference(result,ts);

}




export function compilerGetCommand(list:string[],compilerCompiler:TSCompilerOptions){
    let compileparams:string[];

    compileparams = ["target","module","sourceMap","rootDir","lib" ,"declaration"];    

    if(compilerCompiler.module == "amd"){
        compileparams.push("outFile");
        compilerCompiler.declaration = true;
    }else{
        compileparams.push("outDir");
        compilerCompiler.declaration = false;
    }
    // compilerCompiler.target = "es6";
    let compilekey = "";
    compileparams.forEach(element => {
        let key = compilerCompiler[element];
        if(key){
            if(key instanceof Array){
                key = key.join(",");
            }
            compilekey += `--${element} ${key} `;
        }
    });

    return `tsc  ${compilekey} --removeComments --watch false`;


}













export function compilerProject(){
    
}
