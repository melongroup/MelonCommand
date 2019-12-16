import { forarr, foreach } from "./Attibute";

    export interface ICodeExecBase {
        type: string;
    }

    export interface ICodeCalc extends ICodeExecBase {
        value: (string | ICodeCalc)[];
    }

    export interface ICodeProperty extends ICodeExecBase {
        property: string[];
    }

    export interface ICodeLimit extends ICodeExecBase {
        value_left: number | string | ICodeExecBase;
        bijiao: string;
        value: number | ICodeExecBase;
    }

    export interface ICodeFunction extends ICodeExecBase {
        name: string;
        propertys: any[];
    }

    export interface IModule extends ICodeExecBase {
        list: ICodeFunction[];
        limit: any;
    }

    export interface ICodeCalcString extends ICodeExecBase {
        desc: string;
        propertys: any[];
    }

    export interface IFunction {
        func: Function;
        thisobj: any;
    }


    export const enum CodeType {
        JSCalcString = "JSCalcString",
        JSModule = "JSModule",
        JSFunction = "JSFunction",
        calc = "calc",
        JSProperty = "JSProperty"
    }

    export var codeParsers: { [key: string]: IFunction } = {};

    export type CodeFuncType = (propertys: any, params: any) => any


    export function CodeFunc(name?: string) {
        return function (classPrototype: any, propertyKey: string, descriptor: PropertyDescriptor) {
            name = name || propertyKey;
            codeParsers[name] = { thisobj: classPrototype, func: descriptor.value } as IFunction
        };
    }


    export function codeIntParser(leftval: number, operator: string, rightval: number) {
        if (operator == ":") {
            rightval = Math.abs(rightval);
        }
        return toOpera(leftval, operator, rightval);
    }



    export function codeParserLimit(self: any, property: string | ICodeLimit[], params?: any) {
        let len = property.length;
        let result = false;
        while (len--) {
            let { value_left, value, bijiao } = property[len] as ICodeLimit;
            value_left = codeDoProperty(self, value_left, params);
            value = codeDoProperty(self, value, params);
            let b = codeIntParser(value_left as number, bijiao, value as number) as boolean;

            if (len <= 0) {
                return result || b;
            }

            len--;
            switch (property[len]) {
                case "&&":
                    if (!b) {
                        return false;
                    }
            }

            result = result || b;
        }

        return result;
    }


    export function toOpera(leftValue: number, operaType: string, rightValue: number) {
        switch (operaType) {
            case ">":
                {
                    return leftValue > rightValue;
                }
            case "<":
                {
                    return leftValue < rightValue;
                }
            case ":":
            case ">=":
                {
                    return leftValue >= rightValue;
                }
            case "<=":
                {
                    return leftValue <= rightValue;
                }

            case "=":
            case "==":
                {
                    return leftValue == rightValue;
                }

            case "!=":
                {
                    return leftValue != rightValue;
                }
        }

        return false;
    }


    export function calc(v: number, calcType: string, dv: number) {
        switch (calcType) {
            case "+":
                v += dv;
                break;
            case "-":
                v -= dv;
                break;
            case "*":
                v *= dv;
                break;
            case "/":
                v /= dv;
                break;
        }
        return v;
    }


    export function codeDoProperty(self: object, property: any, params?: object) {
        if (!params) {
            params = self;
        }

        if(property == undefined || property == null){
            return property;
        }

        if (property instanceof Array) {
            let result = [];
            forarr(property, (v, i) => {
                result[i] = codeDoProperty(self, v, params);
                return true;
            });
        }


        if (property.hasOwnProperty("type") == false) {
            let p = property as string;
            if (p == "self") {
                return self;
            }

            let type = typeof property;


            if(type == "object"){
                let c ={};
                foreach(property,(v,k)=>{
                    c[k] = codeDoProperty(self,v,params);
                    return true;
                })
                property = c;
            }
            

            // if (params && params.hasOwnProperty(p)) {
            //     return params[p]
            // }
            return property;
        }


        let p = property as ICodeExecBase;
        let type = p.type;

        if (type == CodeType.JSCalcString) {
            let p = property as ICodeCalcString;
            let result: number[] = [];
            p.propertys.forEach(element => {
                let rev = codeDoProperty(self, element, params);
                result.push(rev);
            });
            return p.desc.substitute(result);
        }


        if (type == CodeType.JSModule) {
            let p = property as IModule;
            let { limit, list } = p;

            if (limit) {
                if (codeParserLimit(self, limit, params) == false) {
                    return null;
                }
            }

            forarr(list, v => {
                codeDoProperty(self, v, params);
                return true;
            })
        }

        if (type == CodeType.JSFunction) {
            let { name, propertys } = property as ICodeFunction;
            let f = codeParsers[name];
            let func: Function;
            let thisobj: object;
            if (!f) {
                f = self[name]
                if (f) {
                    func = self[name] as Function;
                    thisobj = self;
                }else{
                    func = params[name];
                    thisobj = params;
                }
            } else {
                func = f.func;
                thisobj = f.thisobj;
            }

            if (func) {
                let o = [];
                forarr(propertys, (v, i) => {
                    o[i] = codeDoProperty(self, v, params);
                    return true;
                });

                return func.call(thisobj, o, params);
            }
            return undefined;
        }


        if (type == CodeType.calc) {
            let { value } = property as ICodeCalc
            let len = value.length - 1;
            let v = codeDoProperty(self, value[len], params) as number;
            while (len > 0) {
                let calctype = value[len - 1] as string;
                let dv = codeDoProperty(self, value[len - 2], params) as number;
                len -= 2;
                v = calc(v, calctype, dv);
            }
            return v;
        }

        if (type == CodeType.JSProperty) {
            let { property: temp } = property as ICodeProperty;
            let o = params;

            forarr(temp,v=>{
                if (o.hasOwnProperty(v)) {
                    o = o[v];
                } else {
                    return undefined;
                }
                return true;
            });

            return o;
        }


        return property;

    }