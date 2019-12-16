import { readJsonFile, Core, fullproperty, doCommand } from "../core/Core";
import { File, __fs } from "../core/File";
import { ConfigUtil } from "../core/ConfigUtil";
import { Http } from "../core/Http";

export type buildActionType = (data: IBuildData, action: IBuildAction, params?: object) => any;

export var buildActions: { [key: string]: buildActionType } = {};


export function BuildAction(cmd: string) {
    return function (classPrototype: any, propertyKey: string, descriptor: PropertyDescriptor) {
        buildActions[cmd] = descriptor.value;
    };
}

export function PropertyAction() {
    return function (target: Object): void {

    }
}

export function ClassAction() {
    return function (target: Object): void {

    }
}


export async function build(path: string) {

    let context:string;

    if(path.indexOf("://") != -1){

        context = await Http.request(path) as string;

    }else{
        let file = new File(path);
        if (file.exists == false) {
            console.log(`${path} not exists`);
            return;
        }
        context = file.readUTF8();
    }

    let d: IBuildData = readJsonFile(context);
    if (d) {
        fullproperty(d, Core.config);
        fullproperty(d, Core.globalConfig);
        context = ConfigUtil.replace$(context, d);
        d = readJsonFile(context);
    }

    if (!d) {
        return;
    }

    let { cmd } = d;

    for (let i = 0; i < cmd.length; i++) {
        const element = cmd[i];
        let action = buildActions[element.type];
        if (action) {
            await action(d, element);
        }
    }

}

export class BuildActionClass {

    @BuildAction("cmd")
    async cmd(data: IBuildData, action: IBuildAction, params?: object) {
        let {cmd,path,encoding,debug} = action;
        if(path){
            let f = new File(path);
            if(f.exists == false){
                f.mkdir();
            }
        }
        await doCommand(cmd,path,encoding,debug);
    }


}

