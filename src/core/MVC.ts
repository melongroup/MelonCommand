import { singleton } from "./ClassUtils";
import { EventHandler, MiniDispatcher } from "./MiniDispatcher";
import { forarr } from "./Attibute";

    export type EventInterestType = { k: string | number, v: EventHandler }[]

    export interface IEventInterests {
        eventInterests: EventInterestType;
    }

    export const enum ExtensionDefine {
        NONE = ""
    }
    //facade 注册记录保存所有Model class 等信息
    export class Facade extends MiniDispatcher {

        SINGLETON_MSG: string = "Facade Singleton already constructed!";

        constructor() {
            super();
        }

        registerEvent(events: EventInterestType, thisobj: any): void {
            forarr(events, (v, i, o) => {
                this.on(v.k, v.v, thisobj);
                return true;
            })
        }

        removeEvent(events: EventInterestType, thisobj: any): void {
            forarr(events, (v, i, o) => {
                this.off(v.k, v.v, thisobj);
                return true;
            })
        }
    }

    export let facade = singleton(Facade);

    export interface IOpenOption {
        panel: string;
        url: string;
        tab: string | number;
    }

  
    export interface IDisplayIcon {
        id: string | number;
        name: string;
        icon: any;
        bg: string;
    }

    export interface IModelIcon extends IDisplayIcon {
        tag: string;
        moduleName: string;
        model: object;
        guid: string | number;
    }

