import {Component, Inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StreetType} from "../../service/traffic-light";
import {TRAFFIC_MANAGER, TrafficManagerService} from "../../service";

export enum TrafficLightMode {
  CAR = 'CAR',
  PEDESTRIAN = 'PEDESTRIAN'
}

export enum TrafficLightDirection {
  BOTTOM_UP = "BOTTOM_UP",
  LEFT_RIGHT = "LEFT_RIGHT"
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-traffic-light',
  templateUrl: './traffic-light.component.html',
  styleUrl: './traffic-light.component.scss',
})
export class TrafficLightComponent {
  TrafficLightMode = TrafficLightMode;
  TrafficLightDirection = TrafficLightDirection;

  @Input() placeOfUse!: StreetType;
  @Input() mode: TrafficLightMode = TrafficLightMode.CAR;
  @Input() direction: TrafficLightDirection = TrafficLightDirection.BOTTOM_UP;
  @Input() hasRequester = true;

  constructor(@Inject(TRAFFIC_MANAGER) private trafficManagerService: TrafficManagerService) {
  }

  get instance() {
    return this.trafficManagerService.getTrafficLight(this.placeOfUse, this.mode)
  }

  public request() {
    if (this.instance)
      this.trafficManagerService.request(this.instance);
  }
}