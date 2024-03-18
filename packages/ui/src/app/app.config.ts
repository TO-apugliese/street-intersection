import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {appRoutes} from './app.routes';
import {
  StreetType,
  TRAFFIC_LIGHTS,
  TRAFFIC_MANAGER,
  TrafficLight,
  TrafficLightMode,
  TrafficLightState,
  TrafficManagerService
} from "./service";


const mainStreetTraffficLight = new TrafficLight(
    TrafficLightState.GREEN,
    TrafficLightMode.CAR,
    StreetType.MAIN,
);
const sideStreetTrafficLight = new TrafficLight(
    TrafficLightState.RED,
    TrafficLightMode.CAR,
    StreetType.SIDE,
    [mainStreetTraffficLight],
);
const pedestrianTrafficLight = new TrafficLight(
    TrafficLightState.RED,
    TrafficLightMode.PEDESTRIAN,
    StreetType.MAIN,
    [mainStreetTraffficLight],
);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    {
      provide: TRAFFIC_LIGHTS,
      useValue: [
        sideStreetTrafficLight,
        pedestrianTrafficLight,
        mainStreetTraffficLight
      ],
    },
    {
      provide: TRAFFIC_MANAGER,
      useClass: TrafficManagerService,
    }
  ],
};
