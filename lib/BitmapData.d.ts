declare interface IView3duint8{
    data:Uint8Array;
    offset:number;
    order:number[];
    shape:number[];
    size:number;
    stride:number[];

    set?(x:number,y:number,i:number,v:number)
}


declare interface IRectange{
    x:number;
    y:number;
    width:number;
    height:number;
}