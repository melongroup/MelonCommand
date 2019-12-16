import { File } from "./File";

export class ConfigUtil {
    static ConvertParam(str: string) {
        while (str.charAt(0) == "-") {
            str = str.slice(1);
        }
        return str;
    }

    static ConvertArgv(argv: string[], o?: any) {
        if (!o) {
            o = {};
        }
        for (let i = 2; i < argv.length; i++) {
            const key = argv[i];
            if (key.indexOf("--") == 0) {
                let value = argv[i + 1];
                if (value && value.indexOf("-") != 0) {
                    o[this.ConvertParam(key)] = value;
                    i += 1;
                } else {
                    o[this.ConvertParam(key)] = true;
                }
            } else {
                o[this.ConvertParam(key)] = true;
            }
        }
        return o;
    }

    static replace$(context:string,data:any){
        // context = "xcopy ${workspace}\\project\\${project}\\res\\* ${remote}\\${project}\\res\\ /s /e /h /r /k /y /d /EXCLUDE:${workspace}\\project\\uncopy.txt"
        let reg = /\$\{(.[^\n]*?)\}/
        while(true){
            let c = reg.exec(context);
            if(!c){
                break;
            }
            let replaceValue = data[c[1]] as string;
            if(replaceValue == undefined){
                replaceValue = "";
            }else{
                replaceValue = replaceValue.replace(/\\/g,"\\\\");
            }
            let regexp = new RegExp("\\$\\{" + c[1] + "\\}", "g");
            context = context.replace(regexp,replaceValue);
        }

        

        

        // let d = context.match(reg);

        return context;
    }


    // static ReadConfByString(context:string) {

    //     let confstr = this.RemoveComments(context.replace(/\r\n/g, "\n")).replace(/\\\//g, "/").trim();
    
    //     let list = confstr.split("\n");
    //     for (let i = 0; i < list.length; i++) {
    //         let element = list[i] + "\n";
    //         let arr = element.match(/(.*?)=(.*?)\n/);
    //         if (arr) {
    //             let key = arr[1].trim();
    //             let value = arr[2].trim();
    //             let regexp = new RegExp("\\$\\{" + key + "\\}", "g");
    //             confstr = confstr.replace(regexp, value);
    //             // result[arr[1].trim()] = convertNumber(arr[2].trim());
    //         }
    //     }
    
    //     list = confstr.split("\n");
    //     let result = {} as any;
    //     for (let i = 0; i < list.length; i++) {
    //         let element = list[i] + "\n";
    //         let arr = element.match(/(.*?)=(.*?)\n/);
    //         if (arr) {
    //             result[arr[1].trim()] = this.ConvertNumber(arr[2].trim());
    //         }
    //     }
    
    //     return result;
    // }


    static ReadConf(file: File) {
        if (!file.exists) {
            return undefined;
        }

        let confstr = this.RemoveComments(file.readUTF8().replace(/\r\n/g, "\n")).replace(/\\\//g, "/").trim();

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
                result[arr[1].trim()] = this.ConvertNumber(arr[2].trim());
            }
        }

        return result;
    }



    static ConvertNumber(from: string) {
        let num = parseFloat(from)
        if (from == num + "") {
            return num;
        }
        return from;
    }


    static RemoveComments(content: string) {
        var reg1 = /\/\/.*/g;
        var r = content.replace(reg1, '');
        var reg2 = /\/\*[\s\S]*?\*\/[^\*]/g;
        r = r.replace(reg2, '');
        return r;
    }


    //============================================================================================

}