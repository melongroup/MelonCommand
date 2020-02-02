
declare interface Atlas_FrameInfo {
    frames: { [key: string]: Atlas_FrameValue };
    meta: Atlas_Meta;
}

declare interface Atlas_FrameValue {
    frame: Atlas_FrameFrame;
    sourceSize: Atlas_SourceSize;
    spriteSourceSize: Atlas_SpriteSourceSize;
}

declare interface Atlas_FrameFrame {
    h: number;
    idx: number;
    w: number;
    x: number;
    y: number;
}

declare interface Atlas_SourceSize {
    h: number;
    w: number;
}

declare interface Atlas_SpriteSourceSize {
    x: number;
    y: number;
}

declare interface Atlas_Meta {
    image: string;
    prefix: string;
}



declare interface IBitmapSourceData {
    frames: { [key: string]: IBitmapSourceVO }
    width: number;
    height: number;
}

declare interface IAnimationClipData {
    i: number;
    frame: string;
    d: number;
}

declare interface IAnimationBitmapSourceData extends IBitmapSourceData {
    ox: number;
    oy: number;
    sx: number;
    sy: number;

    matrix : Float32Array;

    fps : number;
    animation: IAnimationClipData[];
}


declare interface IPackAnimationConfig {

    fps : number;

}