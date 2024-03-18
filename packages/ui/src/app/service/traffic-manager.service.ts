import {Inject, Injectable, InjectionToken} from "@angular/core";
import {TrafficLightMode} from "../components";
import {
    StreetType,
    TRAFFIC_LIGHTS,
    TrafficLight,
    trafficLightColorChangeDuration,
    TrafficLightState
} from "./traffic-light";
import {wait} from "../util";

// in seconds
const greenPhasesDuration = 5;
const transitionPeriod = 1;

@Injectable({
    providedIn: 'root'
})
export class TrafficManagerService {
    constructor(@Inject(TRAFFIC_LIGHTS) private trafficLights: TrafficLight[]) {

    }

    getTrafficLight(placeOfUse: StreetType, mode: TrafficLightMode) {
        return this.trafficLights.find(t => t.placeOfUse === placeOfUse && t.mode === mode);
    }

    async request(requester: TrafficLight): Promise<void> {
        const {deppendsOnMe} = requester;
        requester.isProcessingRequest = true;
        await this.changeTrafficLightsTo(deppendsOnMe, TrafficLightState.RED)
        await wait(transitionPeriod);

        await requester.changeState(TrafficLightState.GREEN);
        await wait(trafficLightColorChangeDuration);
        requester.startCounter(greenPhasesDuration);

        await wait(greenPhasesDuration);

        await requester.changeState(TrafficLightState.RED);

        await wait(transitionPeriod);

        await this.changeTrafficLightsTo(deppendsOnMe, TrafficLightState.GREEN)

        requester.isProcessingRequest = false;
    }

    private async changeTrafficLightsTo(trafficLights: TrafficLight[] | undefined, state: TrafficLightState) {
        if (trafficLights)
            for (const trafficLight of trafficLights) {
                if (state === TrafficLightState.RED) trafficLight.addRequest();
                else trafficLight.removeRequest();

                if (state === TrafficLightState.GREEN && trafficLight.requestsMeToRed === 0)
                    await trafficLight.changeState(state);
                else if(state === TrafficLightState.RED) await trafficLight.changeState(state);
            }
    }
}

export const TRAFFIC_MANAGER = new InjectionToken('traffic-manager');