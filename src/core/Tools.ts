import { File, __path, __fs } from "./File";
import { doCommand, readJsonFile } from "./Core";
import { BitmapData } from "./BitmapData";
import { amf_writeObject } from "./AMF3";


//============================================================================================================================================================

export async function delay(time:number){
	return new Promise(resolve => {
		setTimeout(resolve,time);
	});
}

/**
 * res 目录下 图片列表放在文件夹中
 * @param res 
 */
export async function packImage(path?:File,out?:File){
	// path = new File("D:/workspace_ts/Poker/source/plane/dtt/a/");
	if(undefined == out){
		out = path.parent.resolvePath("out/");
	}
	// atlas-generator.exe "D:\workspace_ts\Poker\source\plane\dtt/a/" -o "D:\workspace_ts\Poker\source\plane\dtt/r/" -f false -r true
	let exefile = new File(__path.resolve("assets/tool/TP/atlas-generator.exe"));

	console.log(exefile.nativePath);

	if(false == exefile.exists){
		return undefined;
	}

	// ./atlas-generator.exe "D:\workspace\tile\t/" -o "D:\workspace\tile/r/" -f false -r false -p 0 -q 100

	let cmd = `${exefile.nativePath} ${path.nativePath} -o ${out.nativePath} -f false -p 0 -q 100`;

	console.log(cmd)

	await doCommand(cmd);


	// let extName = ".atlas";

	// let files = out.getAllFiles(extName);

	// files.forEach(file => {
	// 	if(false == __fs.existsSync(file.nativePath.replace(extName,".png"))){
	// 		return;
	// 	}
	// 	let value = JSON.parse(file.readUTF8()) as Atlas_FrameInfo;

		



	// });


			

	// let o = {} as IUVFrame;
}

export function refreshUV(vo: IBitmapSourceVO, mw: number, mh: number) {
	const { x, y, w, h } = vo;
	vo.ul = x / mw;
	vo.ur = (x + w) / mw;
	vo.vt = y / mh;
	vo.vb = (y + h) / mh;
	return vo;
}


export async function atlasImage2BitmapSource(from:File,out?:File,fillData?:Function){

	let info = readJsonFile(from) as Atlas_FrameInfo;

	let { frames , meta } = info;

	let imageFile = from.parent.resolvePath(meta.image); 


	let bmd = new BitmapData();
	await bmd.from(imageFile.nativePath);

	let{width,height} = bmd;

    let newFrames = {};

    for (const key in frames) {
        const { frame, sourceSize, spriteSourceSize } = frames[key];
        let { x, y, w, h } = frame;
        let vo = refreshUV({ x, y, w, h,ix:spriteSourceSize.x,iy:spriteSourceSize.y } as IBitmapSourceVO, width, height);
        vo.name = key;
        newFrames[key] = vo;
	}

	let data = {frames:newFrames,width,height} as IBitmapSourceData;

	if(fillData){
		data = fillData(data);
	}

	
	if(out){
		out.mkdir();
		await zipImage(imageFile, out.resolvePath("diff.png"));
		out.resolvePath("data.dat").write(amf_writeObject(data));
	}



}


export async function zipImage(file:File,out?:File){

	let exefile = new File(__path.resolve("assets/tool/pngquant.exe"));

	if(false == exefile.exists){
		return undefined;
	}

	let temp = new File("c:/pngtemp/");
	temp.mkdir();

	let tempf = temp.resolvePath("a.png");
	let tempt = temp.resolvePath("b.png");

	file.copyto(tempf);


	// --quality=80-100
	let cmd = `${exefile.nativePath} ${tempf.nativePath} -o ${tempt.nativePath}  --force --speed 1`;

	await doCommand(cmd,undefined,undefined,true);
	await delay(200);

	tempt.copyto(out);
}



export async function packAnimation(from:File,config:IPackAnimationConfig,out?:File){

	function fillData(data:IAnimationBitmapSourceData){

		let{frames} = data;


		let animation = [] as IAnimationClipData[];

		let i = 0;

		let fps = config.fps;

		if(undefined == fps){
			fps = 24;
		}

		let d = 1000 / fps >> 0;

		for (const frame in frames) {

			let clip = {i,frame,d} as IAnimationClipData;

			animation.push(clip);

		}

		data.animation = animation;
		data.fps = fps;
 
		return data;
	}

	if(!out){
		out = from.parent.resolvePath(from.unExtName);
	}

	await atlasImage2BitmapSource(from,out,fillData)

}



export function DataFormat(d:Date,mask:any,local = false){
		return mask.replace(/"[^"]*"|'[^']*'|(?:d{1,2}|m{1,2}|yy(?:yy)?|([hHMs])\1?)/g, function ($0) {
			switch ($0) {
				case "d": return gd();
				case "dd": return zeroize(gd());
				case "M": return gM() + 1;
				case "MM": return zeroize(gM() + 1);
				case "yy": return (gy() + "").substr(2);
				case "yyyy": return gy();
				case "h": return gH() % 12 || 12;
				case "hh": return zeroize(gH() % 12 || 12);
				case "H": return gH();
				case "HH": return zeroize(gH());
				case "m": return gm();
				case "mm": return zeroize(gm());
				case "s": return gs();
				case "ss": return zeroize(gs());
				default: return $0.substr(1, $0.length - 2);
			}
		});
		function gd() { return local ? d.getDate() : d.getUTCDate() }
		function gM() { return local ? d.getMonth() : d.getUTCMonth() }
		function gy() { return local ? d.getFullYear() : d.getUTCFullYear() }
		function gH() { return local ? d.getHours() : d.getUTCHours() }
		function gm() { return local ? d.getMinutes() : d.getUTCMinutes() }
		function gs() { return local ? d.getSeconds() : d.getUTCSeconds() }
}

export function zeroize(value: number | string, length: number = 2): string {
    let str = "" + value;
    let zeros = "";
    for (let i = 0, len = length - str.length; i < len; i++) {
        zeros += "0";
    }
    return zeros + str;
}