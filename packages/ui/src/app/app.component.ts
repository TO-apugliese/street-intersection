import {Component} from '@angular/core';
import {StreetCrossComponent, TrafficLightComponent, TrafficLightDirection, TrafficLightMode,} from './components';
import {StreetType, TrafficLight, TrafficLightState} from "./service/traffic-light";

@Component({
  standalone: true,
  imports: [StreetCrossComponent, TrafficLightComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  TrafficLightMode = TrafficLightMode;
  StreetType = StreetType;
  TrafficLightDirection = TrafficLightDirection;
}
