export interface IArgs {
    path: string;
    setup: boolean;

    v: boolean;
    version: boolean;

    u: boolean;
    update: boolean;

    c: boolean;
    create: boolean;

    r: boolean;
    release: boolean;
    mini: boolean;
    name: string;
    d: boolean; //declaration
    nohtml: boolean;

    p: boolean;
    publish: boolean;

    web: boolean;

    nodejs: boolean;

    config: string

    h: boolean;
    help: boolean;

    wechat: boolean;

    params: string[];

    tiled: boolean;

    build: string;

    cdts: string;

    sourceMap: boolean;

    texturePack: boolean;

    out: string;

    protobuf: string;

}


export interface TSCompilerOptions {
    target: string;
    module: string;

    outDir: string;
    rootDir: string;
    outFile: string;

    lib: string[];

    sourceMap: boolean;
    declaration: boolean;
}

export interface TSConfigOptions {
    root: string;
    compilerOptions: TSCompilerOptions;
    include: string[];
    exclude: string[];
    templete: string;
    platform: string;
    clientRemote: string;

    engine: {
        remote: string,
        files: string[]
    }

    wechat: {
        appid: string,
        projectName: string,
        files: { [key: string]: string[] }
    };

    main: string;

    publish: {
        replace: string[][];
        xcopy: string[][];
        remote: string;
        cmd: string[];
    }

}


export interface PackageOptions {
    name: string;
    version: string;
    description: string;
    main: string;
    scripts: { [key: string]: string };
    repository: { [key: string]: string };
    author: string;
    license: string;
    dependencies: { [key: string]: string };
}


export class Core {
    static config: IArgs;
    static remotePath: File;
    static remoteMelon: File;
    static binPath: File;
    static appPath: File;
    static isWin: boolean
    static cmdPath: File;

    static globalConfig: any;

    // static remoteCreate = Core.remotePath +"project\\"
    // static remoteEngine = Core.remotePath +"engine\\"
    static async setup() {

        let prefixs = await doCommand("npm config get prefix");

        Core.binPath = new File((prefixs[1] as string).trim() + "/");
        Core.isWin = /^win/.test(process.platform);
        Core.appPath = new File(process.mainModule.filename).parent;

        console.log(Core.appPath.nativePath, Core.appPath.exists);

        let cmdPath: File;
        if (Core.config.path != undefined) {
            cmdPath = new File(Core.config.path);
            if (false == cmdPath.exists) {
                cmdPath = undefined;
            }
        }

        if (!cmdPath) {
            Core.cmdPath = new File(__path.resolve(""));
        } else {
            Core.cmdPath = cmdPath;
        }

        Core.remotePath = new File("../engine");
        Core.remoteMelon = Core.remotePath.resolvePath("melon\\");


        this.globalConfig = ConfigUtil.ReadConf(new File("c:/workspace.conf"));
        let branch = await getBranch();
        if (!this.globalConfig) {
            this.globalConfig = {};
            this.globalConfig.workspace = "D:/workspace";
        }
        this.globalConfig.branch = branch;
        this.globalConfig.svnbranch = branch == "master" ? "trunk" : branch;




        // getTSConfig()
        // if(isWin){
        // }else{
        // }

    }
}

import * as __exec from "child_process";
import * as __iconv from "iconv-lite";
import { ConfigUtil } from "./ConfigUtil";
import { File, __path } from "./File";
import { debugLog } from "./Debug";

const { exec } = require('child_process') as typeof __exec;



export var melonLocalPath = new File(`${process.env.APPDATA}/npm/node_modules/melon/`);

export async function xCopy(from: string, to: string, extend = "/s /e /h /r /k /y /d", exclude?: string) {
    let cmd: string;


    if (Core.isWin) {

        if (exclude) {
            exclude = "/EXCLUDE:" + exclude.replace(/\//g, "\\");
        } else {
            exclude = ""
        }

        from = from.replace(/\//g, "\\");
        to = to.replace(/\//g, "\\");
        cmd = `xcopy ${from}* ${to} ${extend} ${exclude}`;
    } else {
        from = from.replace(/\\/g, "/");
        to = to.replace(/\\/g, "/");
        cmd = `rsync -a ${from}* ${to}`
    }

    // if(debug){
    //     loger(cmd);
    // }
    debugLog(cmd);
    await doCommand(cmd);
}



export async function doCommand(cmd: string, cwd?: string, encoding = "utf-8", debug = false) {
    if (debug) {
        debugLog(cmd);
    }


    let option = {} as ({ encoding: "buffer" | null } & __exec.ExecOptions);
    option.encoding = "buffer";
    option.cwd = cwd;

    return await new Promise(resolve => {
        exec(cmd, option, (error, stdout) => {
            let err: string;
            // try {
            //     // err = require( "iconv-lite").decode(stdout,"GBK");
            //     // err = __iconv.decode(stdout,"GBK");
            //     // err = new TextDecoder("GBK").decode(stdout);

            // } catch (error) {
            err = __iconv.decode(stdout, encoding);
            if (error) {
                debugLog(error.message);
            }

            if (debug) {
                debugLog(err);
            }
            // }

            // if(error){
            //     console.log(err);
            // }
            resolve([error, err])
        });
    });
}

export async function confirm(msg: string) {
    return await new Promise(resolve => {
        process.stdout.write(msg);
        process.stdin.resume();
        process.stdin.setEncoding("utf-8");
        process.stdin.on("data", function (chunk) {
            process.stdin.pause();
            resolve(chunk)
        });
    });
}

export function removeComments(content: string) {
    var reg1 = /[^:]\/\/.*/g;
    var r = content.replace(reg1, '');
    var reg2 = /\/\*[\s\S]*?\*\/[^\*]/g;
    r = r.replace(reg2, '');
    return r;
}

export function readJsonFile(file: File | string) {

    let context: string;

    if (file instanceof File) {
        if (file.exists == false) {
            return undefined;
        }
        context = file.readUTF8();
    } else {
        context = file;
    }

    if (!context) {
        return undefined;
    }

    return JSON.parse(removeComments(context));
}

export function fullproperty(t: object, f: object) {
    for (const key in f) {
        if (t[key] == undefined) {
            t[key] = f[key];
        }
    }
}


export function getTSConfig() {


    let configPath = Core.config.config;
    if (!configPath) {
        configPath = "tsconfig.json"
    }

    let tsconfig = Core.cmdPath.resolvePath(configPath);

    if (tsconfig.exists) {
        try {

            let context = removeComments(tsconfig.readUTF8())
            let ts = JSON.parse(context) as TSConfigOptions;

            for (const key in Core.globalConfig) {
                if (ts[key] == undefined) {
                    ts[key] = Core.globalConfig[key];
                }
            }

            context = ConfigUtil.replace$(context, ts);
            ts = JSON.parse(context) as TSConfigOptions;
            ts.root = Core.cmdPath.nativePath;
            return ts;
        } catch (error) {
            console.log(error);
        }
    }

    console.log("cann't find 'tsconfig.json'")

    return undefined;
}

export function getPackageJson() {
    let configPath = "package.json";
    let tsconfig = Core.cmdPath.resolvePath(configPath);

    if (tsconfig.exists) {
        try {
            let ts = JSON.parse(removeComments(tsconfig.readUTF8())) as PackageOptions;
            return ts;
        } catch (error) {
            console.log(error);
        }
    }

    console.log("cann't find 'tsconfig.json'")

    return undefined;
}



export var referenceMatch = /\/\/\/ <reference path=\"(.*?)\"/g;

export function getReference(files: File[], ts: TSConfigOptions) {
    referenceMatch = /reference path=\"(.*?)\"/;
    var fileobj = {};
    var reference: string[] = [];
    for (var i = 0; i < files.length; i++) {
        var relativepath = files[i];
        var content = relativepath.readUTF8();
        var arr = fileobj[relativepath.nativePath] = [];
        while (true) {
            var match = referenceMatch.exec(content);
            if (match) {
                content = content.replace(match[0], "");
                let filepath = relativepath.resolvePath(match[1]);
                arr.push(filepath);
            } else {
                break;
            }
        }
    }

    var key;

    var processes = [];
    function process(arr: File[]) {
        for (var i = 0; i < arr.length; i++) {
            let f = arr[i];
            var key = f.nativePath;
            if (processes.indexOf(key) == -1) {
                processes.push(key);
                if (reference.indexOf(key) == -1) {
                    if (undefined != fileobj[key]) {
                        process(fileobj[key]);
                    }
                    reference.push(key.replace(ts.root, ""));
                }
            }
        }
    }

    process(files);

    return reference;
};



export function updateEs6Import(files: File[], ts: TSConfigOptions, exclude?: string) {
    let importMatch = /import.*?\"(.[^\.\n]*?)\";/;
    for (var i = 0; i < files.length; i++) {
        var relativepath = files[i];

        if (!exclude || relativepath.nativePath.indexOf(exclude) == -1) {
            // console.log(relativepath.nativePath);
            var content = relativepath.readUTF8();
            content = content.replace(/\.\.\//g, "___%ddt%___")
            var find = false;
            while (true) {
                var match = importMatch.exec(content);
                if (match) {
                    // console.log(relativepath.nativePath,match[1]);
                    let importfile = match[1] as string;
                    if (importfile.indexOf(".js") == -1) {
                        content = content.replace(match[0], match[0].replace(importfile, importfile + ".js"));
                        find = true;
                    }
                } else {
                    break;
                }
            }
            if (find) {
                content = content.replace(/___\%ddt\%___/g, "../");
                // console.log(relativepath.nativePath);
                relativepath.writeUTF8(content);
            }
        }
    }
}



export function compiler_checkAvailable(target: string, assets: string[]) {
    var file;
    target = target.toLocaleLowerCase();
    for (file of assets) {
        var i = target.indexOf(file[0]);
        if (i == -1) {
            continue;
        }

        if (file[1] == 1) {
            return true;
        }
        var path = target.slice(i + 1);
        if (path.lastIndexOf("/") == -1) {
            return true;
        }
    }
    return false;
}


export function getCompilerFiles(ts: TSConfigOptions) {
    let { compilerOptions, include, exclude } = ts;
    function formatAssets(assets: string[]) {
        var r = [];
        var i
        var file;
        let cmdPath = Core.cmdPath;
        for (file of assets) {
            i = file.indexOf("/**/*");
            if (i != -1) {
                r.push([cmdPath.resolvePath(file.slice(0, i + 1)).nativePath.replace(/\\/g, "/").toLowerCase(), 1]);
            } else {
                if ((i = file.lastIndexOf("*")) == file.length - 1) {
                    r.push([cmdPath.resolvePath(file.slice(0, i)).nativePath.replace(/\\/g, "/").toLowerCase(), 2]);
                } else {
                    r.push([(file).replace(/\\/g, "/").toLowerCase(), 3]);
                }
            }
        }
        return r;
    }




    ts.exclude = exclude = formatAssets(exclude);
    let list = new File(ts.root).resolvePath(compilerOptions.rootDir).getAllFiles(undefined, 20);
    let result: File[] = [];
    list.forEach(element => {
        if (element.extname == ".ts") {
            var b = compiler_checkAvailable(element.nativePath, exclude);
            if (false == b) {
                result.push(element);
            }
        }
    });

    if (ts.compilerOptions.module == "commonjs") {
        return getReference(result, ts);
    }

    updateEs6Import(result, ts, "melon_runtime");
    list = new File(ts.root).resolvePath(compilerOptions.outDir).getAllFiles(".js", 20);
    updateEs6Import(list, ts);

    return [];
}


export function loger(msg: string) {
    console.log(msg);
}

export async function getBranch() {
    try {
        let [state, value] = await doCommand("git branch") as string[];
        if (!state || !value) {
            let strs = /\* (.*?)\n/.exec(value) as string[];
            if (strs) {
                return strs[1];
            }
            // let [,branch] = /\* (.*?)\n/.exec(value) as string[];
            // return branch;
        }
    } catch (error) {

    }

    return "master"
}