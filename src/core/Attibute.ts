import { IEventInterests } from "./MVC";

export type ForEachFunction<T> = (v: T, k: string | number, obj: { [key: string]: T } | T[]) => boolean;
export type ForArrFunction<T> = (v: T, k: number, obj: T[]) => boolean;
export type RecycleObjType = {[key:string]:any};
export function forarr<T>(obj: T[], func: ForArrFunction<T>) {
    if (!obj) {
        return;
    }
    let len = obj.length;
    let i = 0;
    while (i < len) {

        if (false === func(obj[i], i, obj)) {
            return;
        }

        i++;
    }

}


export function foreach<T>(obj: { [key: string]: T }, func: ForEachFunction<T>) {
    if (!obj) {
        return;
    }
    for (const key in obj) {
        if (false === func(obj[key], key, obj)) {
            return;
        }
    }
}



export function EVT(...evt: (string | number)[]) {
    return function (classPrototype: IEventInterests, propertyKey: string, descriptor: PropertyDescriptor) {
        let map = classPrototype.eventInterests;
        if (!map) {
            classPrototype.eventInterests = map = [];
        }

        let v = descriptor.value;

        for (let i = 0; i < evt.length; i++) {
            map.push({ k: evt[i], v })
        }

    };
}

export function DebugProperty(enumerable = true, configurable = true) {
    return function (target: any, property: string) {
        Object.defineProperty(target, property, {

            get() {
                return target["debugpro_" + property];
            },

            set(value: any) {
                if (value != target["debugpro_" + property]) {
                    target["debugpro_" + property] = value;
                }

            },

            enumerable,
            configurable
        })
    }
}

export function RecyclePro(defaultValue: any) {
    return function (host: {recyleObj:RecycleObjType}, property: string) {
        let recyleObj = host.recyleObj;
        if(!recyleObj){
            host["recyleObj"] = recyleObj = {};
        }
        recyleObj[property] = defaultValue;
    }
}

