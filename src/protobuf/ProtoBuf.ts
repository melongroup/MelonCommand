
import * as $protobufjs from "protobufjs";
export const _protobuf = require("protobufjs") as typeof $protobufjs;
import { File } from "../core/File";
import { forarr, foreach } from "../core/Attibute";
import { Core } from "../core/Core";


// export interface 


const enum PBType {
    Double = 1,
    Float,
    Int64,
    UInt64,
    Int32,
    Fixed64,
    Fixed32,
    Bool,
    String,
    Group,
    Message,
    Bytes,
    Uint32,
    Enum,
    SFixed32,
    SFixed64,
    SInt32,
    SInt64
}

const type2number = {
    "double": PBType.Double,
    "float": PBType.Float,
    "int64": PBType.Int64,
    "uint64": PBType.UInt64,
    "int32": PBType.Int32,
    "fixed64": PBType.Fixed64,
    "fixed32": PBType.Fixed32,
    "bool": PBType.Bool,
    "string": PBType.String,
    "group": PBType.Group,
    "message": PBType.Message,
    "bytes": PBType.Bytes,
    "uint32": PBType.Uint32,
    "enum": PBType.Enum,
    "sfixed32": PBType.SFixed32,
    "sfixed64": PBType.SFixed64,
    "sint32": PBType.SInt32,
    "sint64": PBType.SInt64,

}

const rule2number = {
    "optional": 1,
    "required": 2,
    "repeated": 3
};


export interface IPBField {
    id: number;
    pro: string;
    type: string;
    rule: string;
}

export interface IPBType {
    type: string;
    name: string;
    fields?: IPBField[];
    values?: { [key: string]: string };
}

export interface IPBMessage {
    name: string;
    options: { [key: string]: any };
    messages: IPBType[];
}

export interface IPBParserData {
    key: string;
    data: IPBMessage;
}

export interface IPBCode {
    dts: string;
    code: any;
    enumCode: string;
    enumKeyCode: string;
}



export function ProtoBufParser() {

    let nativeFile: File

    if (typeof Core.config.protobuf == "boolean") {
        nativeFile = Core.cmdPath;
    } else {
        nativeFile = new File(Core.config.protobuf);
    }

    if (nativeFile.exists) {
        let o = ProtoBuf.parser(nativeFile)
        let codes = ProtoBuf.toTSCode(o);

        let { enumKeyCode, enumCode, dts, code } = codes;

        nativeFile.resolvePath("pbcode.d.ts").writeUTF8(enumCode + dts + enumKeyCode);
        nativeFile.resolvePath("pbcode.json").writeUTF8(JSON.stringify(code));

    }



}


export class ProtoBuf {



    static parser(folder: File) {
        let list = folder.getAllFiles(".proto");
        forarr(list, (v, i) => {
            list[i] = v.nativePath as any;
            return true;
        })
        let root = _protobuf.loadSync(list as any);

        let { nestedArray, files } = root;

        let nativePath = folder.nativePath;

        let nses = [] as IPBParserData[];

        forarr(nestedArray, (v, i) => {
            let key = files[i].replace(nativePath, "");
            let data = this.parserNamespace(v as $protobufjs.Namespace)
            nses.push({ key, data });
            return true;
        });

        return nses;
    }

    static parserNamespace(ns: $protobufjs.Namespace) {

        let { options, name, nestedArray } = ns;
        name += "_";
        let messages = [];
        forarr(nestedArray, (v, k) => {
            let message: IPBType;
            if (v instanceof $protobufjs.Enum) {
                message = this.parserEnum(v)
            } else {
                message = this.parserType(v as $protobufjs.Type);
            }
            message.name = name + message.name;
            messages.push(message);
            return true;
        })

        return { name, messages, options } as IPBMessage;

    }


    static parserType(type: $protobufjs.Type) {
        let { fieldsArray, name } = type;

        let fields = [] as IPBField[];

        forarr(fieldsArray, v => {

            let { name: pro, type, optional, repeated, required, id } = v;
            let rule = repeated ? "repeated" : required ? "required" : "optional";
            fields.push({ id, pro, type, rule } as IPBField)
            return true;
        })

        return { type: "type", name, fields } as IPBType;
    }

    static parserEnum(en: $protobufjs.Enum) {
        let { valuesById: values, name } = en;

        return { type: "enum", name, values } as IPBType;
    }



    static field2type(field: IPBField, ns: string): string {
        let type = field.type;
        // let ttype: string | number;
        switch (type) {
            case "int32":
            case "sint32":
            case "sfixed32":
                type = "number";
                // ttype = NSType.Int32;
                break;
            case "enum":
            case "fixed32":
            case "uint32":
                type = "number";
            // ttype = NSType.Uint32;

            case "double":
            case "float":
                type = "number";
                // ttype = NSType.Double;
                break;
            case "bool":
                type = "boolean";
                // ttype = NSType.Boolean;
                break;
            case "bytes":
                type = "ByteArray";
                // ttype = NSType.Bytes;
                break;
            case "fixed64":
            case "sfixed64":
            case "int64":
            case "uint64":
            case "sint64":
                // 项目理论上不使用
                type = "number";
                // ttype = NSType.Int64;
                break;
            // case "message":
            // type = field.type;
            // isMsg = MsgType.isAllMsg;
            // ttype = `"${type}"`;
            // break;
            case "string":
                type = "string";
                // ttype = NSType.String;
                break;
            default:
                type = field.type;
                if (type.indexOf(".") == -1) {
                    type = ns + type;
                } else {
                    type = type.replace(/\./, "_");
                }
                // isMsg = MsgType.isServerMsg;
                // ttype = `"${type}"`;
                break;
        }
        if (field.rule == "repeated") { // 数组赋值
            return type + "[]";
        }
        return type;
    }


    static toTSCode(value: IPBParserData[]) {

        let dts = "";
        let code = "";
        let enumCode = "";

        let protodic = {};
        let protokey = {};
        let codes = {}
        let key = 0;

        forarr(value, data => {
            let { name: ns, messages } = data.data;
            forarr(messages, v => {
                let { type, name } = v;

                if (v.type == "type") {
                    dts += this.toTSTypeDTSCode(v, ns);
                    let k = key++;
                    let n = name;
                    protodic[k] = n;
                    protokey[n] = k;
                    codes[k] = this.toTSTypeCode(v, ns);
                } else {
                    enumCode += this.toTSEnumDTSCode(v);
                }
                return true;
            })
            return true;
        })

        foreach(codes, n => {
            foreach(n as any, v => {
                if (v[3]) {
                    v[3] = protokey[v[3]];
                }
                return true;
            })
            return true;
        })



        let enumKeyCode = this.toProtoEnumDTSCode(protodic)


        return { dts, code: codes, enumCode, enumKeyCode } as IPBCode;
    }


    static toProtoEnumDTSCode(protodic: { [key: string]: string }) {
        let code = `

/**
 * 
 */ 
declare const enum PBDictKey {\n`
        foreach(protodic, (v, k) => {

            code += `\t${v} = ${k},\n`

            return true;
        })

        code = code.slice(0, code.length - 2) + "\n";

        code += "}\n";

        return code;
    }


    static toTSTypeDTSCode(message: IPBType, ns: string) {

        let code = `

/**
 * 
 */ 
declare interface ${message.name} {\n`

        forarr(message.fields, v => {

            let { id, pro, type, rule } = v;

            let tstype = this.field2type(v, ns);

            code += `\t${pro}: ${tstype};\n`


            return true;
        })

        code += "}\n";

        return code;
    }

    static toTSTypeCode(message: IPBType, ns: string) {

        let o = {};
        forarr(message.fields, v => {

            let { id, pro, type, rule } = v;
            let ruleCode = rule2number[rule];
            let typeCode = type2number[type];

            if (typeCode == undefined) {
                typeCode = 11;
                if (type.indexOf(".") == -1) {
                    type = ns + type;
                }
                o[id] = [pro, ruleCode, typeCode, type]
            } else {
                o[id] = [pro, ruleCode, typeCode]
            }



            return true;
        });

        return o;
    }

    static toTSEnumDTSCode(message: IPBType) {

        let code = `

/**
 * 
 */ 
declare const enum ${message.name} {\n`
        foreach(message.values, (v, k) => {

            code += `\t${v} = ${k},\n`

            return true;
        })

        code = code.slice(0, code.length - 2) + "\n";

        code += "}\n";

        return code;
    }


}