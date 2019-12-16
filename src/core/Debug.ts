import { DataFormat } from "./Tools";

    // export function 

    /**
     * 0 normal
     * 1 加粗
     * 4 下划线
     * 30 - 37 颜色
     *          30 灰
     *          31 红
     *          32 绿
     *          33 咖啡
     *          34 蓝色
     *          35 紫色
     *          36 蓝绿
     *          37 深灰
     * 40 - 47 背景
     * 90 - 97 颜色
     * 100 - 107 背景
     */


     export const enum LOG_COLOR{
        BOLD = "\x1B[1m",
        UNDER_LINE= "\x1B[4m",
        WHITE = "\x1B[0m",
        GRAY = "\x1B[30m", 
        RED = "\x1B[31m",
        GREEN = "\x1B[32m",
        BROWN = "\x1B[33m",
        BLUE = "\x1B[34m",
        MAGENTA = "\x1B[35m",
        CYAN = "\x1B[36m",
        BLACK = "\x1B[37m",
     }

     export function debugLog(msg:string,bold = false,underline = false){
        msg = `[${DataFormat(new Date(),"HH:mm:ss",true)}] ${debugRender(msg,bold,underline)}`
        console.log(msg);
     }

     export function debugRender(msg:string,bold = false,underline = false){

        if(underline){
            msg = "\x1B[4m" + msg;
        }

        if(bold){
            msg = "\x1B[1m" + msg;
        }

        return msg;
     }