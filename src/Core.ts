export interface IArgs{
    setup:boolean;
    update:boolean;
    create:boolean;
    c:boolean; //编译
}

export class Core{
    static config:IArgs;
}