import { Link } from "./Link";
import { tm_add, defaultTimeMixer, TickHandler } from "./Timer";

export let nextUpdateTime:number = 0;

export var lastUpdateTime:number = 0;

export var lastUpdateDate:number = 0;

export let frameInterval: number = 0;

//当前程序运行了多长时间
export let engineNow:number = 0;


//可显示区域宽高
export var windowWidth:number = 0;
export var windowHeight:number = 0;
export var isWindowResized:boolean = false;

//需求显示宽高 支持外部传参
export var stageWidth:number = 0;
export var stageHeight:number = 0;

export var pixelRatio:number = 1;




export type ResizeHandler = (width: number, height: number) => void

export let resizeStageSizeFunction:ResizeHandler = defaultResize;


// export let engie_animation_request:Function = undefined;
export class Engine {
	//当前程序开始时间
	static startTime: number = 0;

	//上一帧到本帧间隔时间
	static interval: number = 0;
	//窗口是否最小化
	static hidden: boolean = false;
	//窗口最小化开始时间
	static hiddenTime: number = 0;
	//一秒内刷新次数
	static fps: number = 0;
	//一秒内执行代码使用时间
	static code: number = 0;

	static ticklink = new Link();
	static resizeLink: Link = new Link();

	private static _frameRate: number = 60;
	private static _nextProfileTime: number = 0;
	private static _fpsCount: number = 0;
	private static _codeTime: number = 0;

	static fpsHandler:Function;

	static start(): void {
		
		Engine.startTime = Date.now();
		engineNow = 0;
		Engine.frameRate = Engine._frameRate;
		nextUpdateTime = frameInterval;
		lastUpdateTime = Engine.startTime; 
		Engine._nextProfileTime = 1000;

		//动画ENTER_FRAME;
		let animationRequest = requestAnimationFrame;

		function onAnimationChange(time): void {
			animationRequest(onAnimationChange);


			let interval = time - lastUpdateTime;
			let now:number;
			if(interval < 0){
				//时间重置了
				now = Date.now() - Engine.startTime;
				interval = now - engineNow;
				nextUpdateTime = now;
			}else{
				now = interval + engineNow;
			}

			if(now < nextUpdateTime){
				return;
			}

			lastUpdateTime = time;
			lastUpdateDate = Date.now();

			tm_add(defaultTimeMixer,interval);
			nextUpdateTime += frameInterval;
			engineNow = now;
			Engine.update(now, interval);
			Engine.profile();
		}

		animationRequest(onAnimationChange);


		// wx.onWindowResize((res:wx.IWindowResizeData) => {
		// 	let{windowWidth:width,windowHeight:height}=res;
		// 	if(windowWidth != width || windowHeight != height){
		// 		windowWidth = width;
		// 		windowHeight = height;
		// 		isWindowResized = true;
		// 	}
		// })

		// resizeStageSizeFunction(windowWidth,windowHeight);


		// resizeStageSizeFunction(windowWidth,windowHeight);
		// //窗口最大化最小化监听
		// var hidden, state, visibilityChange;
		// if (typeof document['hidden'] !== 'undefined') {
		// 	hidden = 'hidden';
		// 	visibilityChange = 'visibilitychange';
		// 	state = 'visibilityState';
		// } else if (typeof document['mozHidden'] !== 'undefined') {
		// 	hidden = 'mozHidden';
		// 	visibilityChange = 'mozvisibilitychange';
		// 	state = 'mozVisibilityState';
		// } else if (typeof document['msHidden'] !== 'undefined') {
		// 	hidden = 'msHidden';
		// 	visibilityChange = 'msvisibilitychange';
		// 	state = 'msVisibilityState';
		// } else if (typeof document['webkitHidden'] !== 'undefined') {
		// 	hidden = 'webkitHidden';
		// 	visibilityChange = 'webkitvisibilitychange';
		// 	state = 'webkitVisibilityState';
		// }

		// document.addEventListener(
		// 	visibilityChange,
		// 	function () {
		// 		let stateDesc: string = document[state];
		// 		let hidden: boolean = stateDesc.toLocaleLowerCase().indexOf('hidden') != -1;
		// 		Engine.hidden = hidden;
		// 		if (hidden) {
		// 			Engine.hiddenTime = Date.now();
		// 		} else {
		// 			if (0 != Engine.hiddenTime) {
		// 				let delayTime: number = Date.now() - Engine.hiddenTime;
		// 				Engine.startTime += delayTime;
		// 				Engine._nextProfileTime += delayTime;
		// 				nextUpdateTime += delayTime;
		// 				Engine.hiddenTime = 0;
		// 			}
		// 		}
		// 		ROOT.simpleDispatch(EngineEvent.VISIBILITY_CHANGE, hidden);
		// 	},
		// 	false
		// );
	}


	static addResize(value: ResizeHandler,thisObj:any): void {
		Engine.resizeLink.add(value,thisObj);
		// let {stageWidth, stageHeight} = offsetResize;
		value.call(thisObj,stageWidth,stageHeight);
	}

	static removeResize(value: ResizeHandler,thisObj:any): void {
		Engine.resizeLink.remove(value);
	}

	static resize(width: number, height: number): void {
		//todo other
		// console.log("Engine resize");
		let vo = Engine.resizeLink.getFrist();
		while (vo) {
			let next = vo.next;
			if (false == vo.close) {
				let value = vo.data as ResizeHandler;
				value.call(vo.thisObj, width, height);
			}
			vo = next;
		}
	}



	static addTick(tick : TickHandler,thisObj : object): void {
		Engine.ticklink.add(tick,thisObj);
	}

	static removeTick(tick : TickHandler,thisObj : object): void {
		Engine.ticklink.remove(tick,thisObj);
	}

	static update(now: number, interval: number): void {

		if (isWindowResized) {
			isWindowResized = false;
			resizeStageSizeFunction(windowWidth,windowHeight);
		}

		let vo = Engine.ticklink.getFrist();
		while (vo) {
			let next = vo.next;
			if (false == vo.close) {
				let tick: TickHandler = vo.data;
				tick.call(vo.thisObj , now , interval);
			}
			vo = next;
		}
	}

	static set frameRate(value: number) {
		Engine._frameRate = value;
		frameInterval = 1000 / value;
	}

	static get frameRate(): number {
		return Engine._frameRate;
	}

	static profile(): void {
		let now: number = getTimer();
		let interval = now - Engine._nextProfileTime;

		Engine._fpsCount++;
		Engine._codeTime += now - engineNow;

		if (interval > 0) {
			if(interval > 2000){
				Engine._nextProfileTime = now + 1000;
			}else{
				Engine._nextProfileTime += 1000;
			}
			
			Engine.fps = Engine._fpsCount;
			Engine.code = Engine._codeTime;
			Engine._fpsCount = 0;
			Engine._codeTime = 0;

			if(Engine.fpsHandler){
				Engine.fpsHandler();
			}

		}
	}
	
}

export function getTimer(): number {
	return engineNow + getT() - lastUpdateDate;
}

export const getT: ({ (): number }) = Date.now;


export function defaultResize(width:number,height:number){

	windowWidth = width;
	windowHeight = height;

	let link = Engine.resizeLink;

	for (let vo = link.getFrist(); vo ; vo = vo.next) {
		if(vo.close == false){
			let{data,thisObj} = vo;
			data.call(thisObj,width,height);
		}
	}

	
	// innerWidth = width * pixelRatio;
	// innerHeight = height * pixelRatio;
	// stageWidth = innerWidth;
	// stageHeight = innerHeight;
}