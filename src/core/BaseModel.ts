import { singleton } from "./ClassUtils";
import { MiniDispatcher, EventHandler } from "./MiniDispatcher";
import { EventInterestType, IModelIcon, facade } from "./MVC";
import { codeDoProperty, codeIntParser } from "./CodeExec";
import { forarr } from "./Attibute";

export interface IConditionRuntime extends IModelIcon {
    fromModule: string;
    opera: string;
    value: any;
    pt: string;
    count: number;
    quality: number;
    maxCount: number;
}

export interface IConfigLimit {
    module: string;
    target: IConditionRuntime[];
    value: IConditionRuntime[];
    count: IConditionRuntime;
}

export interface IModels {
    [key: string]: BaseModel
}

export var models = {} as IModels;

export function getModels() {
    let modelList = [] as BaseModel[];

    for (const key in models) {
        let model = models[key];
        modelList.push(model);
    }

    modelList.doSort("priority", true);

    return modelList;
}



export function RegisterModel(type: string) {
    return (target: { new(): BaseModel }) => {
        let model = singleton(target);
        model.key = type;
        models[type] = model;
    }
}

export function initSaveData() {

    let data = {}

    let modelList = getModels();

    for (let i = 0; i < modelList.length; i++) {
        let model = modelList[i];
        model.loadSaveData(data[model.key] || {});
    }
}




export function toSaveData() {

    

}

export function cleanSaveData() {
    
}



export class BaseModel extends MiniDispatcher {

    eventInterests: EventInterestType

    key: string;

    priority = 0;

    runtimes: { [key: string]: any };

    constructor() {
        super()
        this.runtimes = {};
        facade.registerEvent(this.eventInterests, this);
    }

    initData() {

    }

    activeRuntime(limit: IConfigLimit) {
        return undefined;
    }

    getRuntime(id: number) {
        return this.runtimes[id];
    }

    removeRuntime(id: number) {
        this.runtimes[id] = undefined;
    }


    toSaveData() {
        return undefined;
    }

    loadSaveData(runtimes: { [key: string]: any }) {

    }


    filterRuntime(limit: IConfigLimit, params: IConditionRuntime) {


        let { runtimes, key } = this;

        if (!params || params.moduleName != key) {

            let { target } = limit;
            let find = false;
            if (target && target.length) {
                for (const key in runtimes) {
                    let runtime = runtimes[key];
                    for (let i = 0; i < target.length; i++) {
                        let { id, value: v } = target[i];
                        v = codeDoProperty(this, v, runtime);
                        let cv = runtime[id];
                        if (cv instanceof Array) {
                            if (cv.indexOf(v) == -1) {
                                break;
                            }
                        } else {
                            if (cv + "" == v + "") {
                                find = true;
                                break;
                            }
                        }
                    }

                    if (find) {
                        runtimes = runtime;
                        break;
                    }
                }

            }
        } else {
            runtimes = params;
        }
        return runtimes;
    }

    addLimit(limit: IConfigLimit, times = 1, params: IConditionRuntime) {


        let runtime = this.filterRuntime(limit, params);
        let { value } = limit;

        if (runtime) {

            // if(this.activeCheck){
            //     for (let i = 0, len = value.length; i < len; i++) {
            //         let { id } = value[i];
            //         if(id == "active"){
            //            this.activeRuntime(limit);
            //            break;
            //         }
            //     }
            // }

            // }else{
            for (let i = 0, len = value.length; i < len; i++) {
                let { opera, id, value: v } = value[i];
                v = codeDoProperty(this, v, runtime);
                v *= times;
                switch (opera) {
                    case ":":
                        let d = runtime[id];
                        if (d == undefined) {
                            d = 0;
                        }

                        v = d + v
                        // runtime[id] = d + v;

                        break
                    case "=":
                        break;
                    default:
                        v = undefined;
                        break;

                }

                if (v != undefined) {
                    runtime[id] = this.checkValueClamp(id, v);
                    facade.simpleDispatch(`${this.key}_${id}`, runtime);
                }

                //console.log(`${this.key}_${id}  ${v}`);

            }
        }
    }

    checkValueClamp(id: string | number, v: number) {
        return v;
    }

    checkLimit(limit: IConfigLimit, times = 1, params: IConditionRuntime) {
        let runtime = this.filterRuntime(limit, params);

        if (!runtime) {
            return;
        }

        let { value } = limit;

        if (value) {
            for (let i = 0, len = value.length; i < len; i++) {
                let cr = value[i];
                let { opera, id, value: v } = cr;
                v = codeDoProperty(this, v, runtime);
                v *= times;
                let d = runtime[id];
                if (d == undefined) {
                    d = 0;
                }

                if (codeIntParser(d, opera, v) == false) {
                    return cr;
                }
            }
        }


        return undefined;
    }


    onLimit(limit: IConfigLimit, handler: EventHandler, thisobj: object) {

        forarr(limit.value, v => {
            let key = `${this.key}_${v.id}`
            facade.on(key, handler, thisobj);
            return true
        })

    }

    offLimit(limit: IConfigLimit, handler: EventHandler, thisobj: object) {
        forarr(limit.value, v => {
            let key = `${this.key}_${v.id}`
            facade.off(key, handler, thisobj);
            return true
        })

    }

}


export function onLimit(limits: IConfigLimit[], handler: EventHandler, thisobj: object) {
    forarr(limits, limit => {
        let model = models[limit.module];
        if (model) {
            model.onLimit(limit, handler, thisobj)
        }
        return true;
    })
}

export function offLimit(limits: IConfigLimit[], handler: EventHandler, thisobj: object) {
    forarr(limits, limit => {
        let model = models[limit.module];
        if (model) {
            model.offLimit(limit, handler, thisobj)
        }
        return true;
    })
}

export function checkLimit(limits: IConfigLimit[], times = 1, params?: IConditionRuntime) {
    for (let i = 0, len = limits.length; i < len; i++) {
        const limit = limits[i];
        let model = models[limit.module];
        if (model) {
            let cr = model.checkLimit(limit, times, params)
            if (cr != undefined) {
                return cr;
            }
        }
    }
    return undefined;
}

export function addLimit(limits: IConfigLimit[], times = 1, params?: IConditionRuntime) {
    for (let i = 0, len = limits.length; i < len; i++) {
        const limit = limits[i];

        let model = models[limit.module];
        if (model) {
            model.addLimit(limit, times, params);
        }
    }
}


export function getConditionValue(model: BaseModel, condition: IConditionRuntime[], property = undefined, runtime = undefined) {
    for (let j = 0; j < condition.length; j++) {
        const v = condition[j];
        if (v.opera == ":") {
            if (!property || v.id == property) {
                
                return Math.abs(codeDoProperty(model, v.value, runtime));
            }
        }
    }
    return 0;
}


export function getLimitValue(limits: IConfigLimit[], property: string, module = "res", params?: IConditionRuntime) {
    for (let i = 0, len = limits.length; i < len; i++) {
        const limit = limits[i];
        if (!module || limit.module == module) {
            let model = models[limit.module];
            if (!model) return 0;
            return getConditionValue(model, limit.value, property, model.filterRuntime(limit, params));
        }
    }

    return 0;
}


export function getRuntimes(module: string, id = undefined) {
    let model = models[module];
    if (undefined == model) {
        return undefined;
    }

    let runtimes = model.runtimes;
    if (id != undefined) {
        runtimes = runtimes[id];
    }

    return runtimes;
}


export function addProperty(key: string, value: any, module = "res", id = undefined) {
    let runtimes = getRuntimes(module, id);
    if (runtimes) {
        let v = runtimes[key];
        runtimes[key] = ~~v + value;
        // console.log(`${module}_${key}  ${v}`);
        facade.simpleDispatch(`${module}_${key}`, runtimes);
    }
    return runtimes;
}


export function setProperty(key: string, value: any, module = "res", id = undefined) {
    let runtimes = getRuntimes(module, id);
    if (runtimes) {
        runtimes[key] = value;
        // console.log(`${module}_${key}  ${value}`);
        facade.simpleDispatch(`${module}_${key}`, runtimes);
    }
    return runtimes;
}



export function getProperty(key: string, module = "res", id = undefined) {
    let runtimes = getRuntimes(module, id);
    let value = undefined;
    if (runtimes) {
        value = runtimes[key];
    }
    return value;
}


export function checkAndBuy(limits: IConfigLimit[], handler: Function, times = 1, params = undefined) {
    let resule = checkLimit(limits, times, params);

    if (undefined == resule) {

        addLimit(limits, times, params);

        handler();

    } else {
        console.log(resule);
    }



    return resule;
}