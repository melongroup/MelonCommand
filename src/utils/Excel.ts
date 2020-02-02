import * as $XLSX from 'xlsx';
import { File } from '../core/File';
import { forarr } from '../core/Attibute';
export const XLSX = require("xlsx") as typeof $XLSX;


export class Excel {

    static initExcel() {

        let count = 0;
        let o = {} as { [key: string]: number };

        for (let j = 0; j < 26; j++) {
            o[String.fromCharCode(65 + j)] = count++;
        }

        for (let j = 0; j < 26; j++) {
            let a = String.fromCharCode(65 + j);
            for (let i = 0; i < 26; i++) {
                let b = String.fromCharCode(65 + i);
                o[a + b] = count++;
            }
        }



        return o;
    }

    static sheetToNum: { [key: string]: number } = Excel.initExcel();

    file: File;

    wb: $XLSX.WorkBook

    constructor(file: File) {
        this.file = file;
        this.wb = XLSX.readFile(file.nativePath);
    }

    formulaeToArray(formulae: string[]) {
        let result = [] as string[][];
        let reg = /([A-Z]+)(\d+)=(.*)/;
        let sheetToNum = Excel.sheetToNum;

        forarr(formulae, v => {
            let [, k, i, s] = v.match(reg);
            let j = sheetToNum[k];
            let temp = result[i];
            if (!temp) result[i] = temp = [];
            temp[j] = s.charAt(0) == "'" ? s.slice(1) : parseFloat(s)
            return true;
        })

        return result;
    }


    parserToList() {
        let { wb } = this;
        let steel = wb.Sheets[wb.SheetNames[0]];
        // let formulae = XLSX.utils.sheet_to_formulae(steel);
        // let list = this.formulaeToArray(formulae);
        // return list;
        let json = XLSX.utils.sheet_to_json(steel, { header: 0 });

        return [];

    }

}

export function excelToJson(file: File) {

    new Excel(file).parserToList();

    // let wb = XLSX.readFile(file.nativePath);
    // let steel = wb.Sheets[wb.SheetNames[0]];

    // let obj = XLSX.utils.sheet_to_json(steel);
    // obj = XLSX.utils.sheet_to_csv(steel) as any;
    // obj = XLSX.utils.sheet_to_dif(steel) as any;
    // obj = XLSX.utils.sheet_to_eth(steel)as any;

    // obj = XLSX.utils.sheet_to_slk(steel)as any;
}



