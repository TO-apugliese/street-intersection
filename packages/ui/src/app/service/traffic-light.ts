import {BehaviorSubject} from "rxjs";
import {InjectionToken} from "@angular/core";
import {wait} from "../util";

export enum TrafficLightState {
    GREEN = 'GREEN',
    RED = 'RED'
}

export enum StreetType {
    MAIN = 'MAIN',
    SIDE = 'SIDE',
}

export enum TrafficLightMode {
    CAR = 'CAR',
    PEDESTRIAN = 'PEDESTRIAN'
}

export const trafficLightColorChangeDuration = 1;

export class TrafficLight {
    private _isGreen = false;
    private _isYellow = false;
    private _isRed = false;
    private _isChangingState = false;
    private _requestsMeToRed = 0;
    isProcessingRequest = false;
    counter = 0;
    state!: BehaviorSubject<TrafficLightState>;

    constructor(
        initialState: TrafficLightState,
        public mode = TrafficLightMode.CAR,
        public placeOfUse: StreetType,
        public deppendsOnMe?: TrafficLight[],
    ) {
        if (initialState === TrafficLightState.GREEN) {
            this._isGreen = true;
            this.state = new BehaviorSubject<TrafficLightState>(TrafficLightState.GREEN);
        } else {
            this._isRed = true;
            this.state = new BehaviorSubject<TrafficLightState>(TrafficLightState.RED);
        }
    }

    get requestsMeToRed() {
        return this._requestsMeToRed;
    }

    public addRequest() {
        this._requestsMeToRed++;
    }

    public removeRequest() {
        this._requestsMeToRed--;
    }

    get isGreen() {
        return this._isGreen;
    }

    get isYellow() {
        return this._isYellow;
    }

    get isRed() {
        return this._isRed;
    }

    get currentState(): TrafficLightState {
        return this.state.getValue();
    }

    async changeState(state: TrafficLightState): Promise<void> {
        if (this._isChangingState === true || state === this.currentState) return;

        this._isChangingState = true;

        if (state === TrafficLightState.GREEN) await this.fromRedToGreen();
        else await this.fromGreenToRed();

        this._isChangingState = false;
    }

    private async fromRedToGreen() {
        this._isYellow = true;
        await wait(trafficLightColorChangeDuration);
        this._isRed = false;
        this._isYellow = false;
        this._isGreen = true;
        this.state.next(TrafficLightState.GREEN);
    }

    private async fromGreenToRed() {
        this._isGreen = false;
        this._isYellow = true;
        await wait(trafficLightColorChangeDuration);
        this._isYellow = false
        this._isRed = true;
        this.state.next(TrafficLightState.RED);
    }

    public startCounter(length: number) {
        this.counter = length;
        const inter = setInterval(() => {
            this.counter--;
            if (this.counter === 0) clearInterval(inter);
        }, 1000);
    }
}

export const TRAFFIC_LIGHTS = new InjectionToken('traffic-lights');