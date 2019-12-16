import { exec } from "child_process";

import * as $path from "path";
const __path = require("path") as typeof $path;

import * as $fs from "fs";
import { Buffer } from "buffer";
const __fs = require("fs") as typeof $fs;


async function doCommand(cmd:string) {
    // console.log(cmd)
    return new Promise(resolve => {
        exec(cmd, { encoding: 'buffer' }, (error, stdout) => {
            // let err = new TextDecoder("gbk").decode(stdout);
            resolve([error, stdout.toString().replace("\n","")]);
        });
    });
}

function RemoveComments(content: string) {
    var reg1 = /\/\/.*/g;
    var r = content.replace(reg1, '');
    var reg2 = /\/\*[\s\S]*?\*\/[^\*]/g;
    r = r.replace(reg2, '');
    return r;
}

function ConvertNumber(from: string) {
    let num = parseFloat(from)
    if (from == num + "") {
        return num;
    }
    return from;
}

function readConf(context:string) {

    let confstr = RemoveComments(context.replace(/\r\n/g, "\n")).replace(/\\\//g, "/").trim();

    let list = confstr.split("\n");
    for (let i = 0; i < list.length; i++) {
        let element = list[i] + "\n";
        let arr = element.match(/(.*?)=(.*?)\n/);
        if (arr) {
            let key = arr[1].trim();
            let value = arr[2].trim();
            let regexp = new RegExp("\\$\\{" + key + "\\}", "g");
            confstr = confstr.replace(regexp, value);
            // result[arr[1].trim()] = convertNumber(arr[2].trim());
        }
    }

    list = confstr.split("\n");
    let result = {} as any;
    for (let i = 0; i < list.length; i++) {
        let element = list[i] + "\n";
        let arr = element.match(/(.*?)=(.*?)\n/);
        if (arr) {
            result[arr[1].trim()] = ConvertNumber(arr[2].trim());
        }
    }

    return result;
}


async function install_package(path:string,cmd:string,desc:string){
    
    if(__fs.existsSync(path) == false){
        console.log(desc);
        await doCommand(cmd);
    }
}


async function setup(){
    let prefixs = await doCommand("npm config get prefix");
    let root = prefixs[1];
    let remote = "../engine";
    await doCommand(`xcopy ${remote}\\* ${root} /s /e /h /r /k /y /d`);

    await install_package(__path.join(root,"cnpm"),"npm install -g cnpm --registry=https://registry.npm.taobao.org","安装cnpm");
    await install_package(__path.join(root,"tsc"),"cnpm install typescript -g","Install TypeScript");
    await install_package(__path.join(root,"uglifyjs"),"cnpm install uglify-js -g","Install uglify");
    await install_package(__path.join(root,"electron"),"cnpm install electron -g","Install electron");


    
    let conf_path = "c:\\workspace.conf"
    let conf : any
    let workspace:string;

    if(__fs.existsSync(conf_path)){
        conf = readConf(__fs.readFileSync(conf_path,"utf-8"));
        workspace = conf.workspace;
    }else{
        workspace = "d:\\workspace"
    }

    console.log(`workspace : ${workspace}`)

    let folders = [workspace];
    for (let i = 0; i < folders.length; i++) {
        const path = folders[i];
        if(__fs.existsSync(path) == false){
            __fs.mkdirSync(path);
        }
    }

    __fs.writeFileSync(`${workspace}/uncopy.txt`,Buffer.from(`.svn\r\n.git\r\nuncopy.txt`));

}

setup();

