import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from "ngx-mqtt";
import { Observable } from "rxjs";
import { LocalStorage } from '../localstore.service';

@Injectable({
  providedIn: 'root'
})
export class KotMqttService {

  private endpoint: string;

  constructor(private _mqttService: MqttService, private localService: LocalStorage) { 
    this.endpoint = this.localService.get('mqtt_token');  
  }

  topic(topic: string): Observable<IMqttMessage> {
    let topicName = `${this.endpoint}/${topic}`; 
    return this._mqttService.observe(topicName);
  }

  publish(topic: string,message:any): Observable<any> {
    let topicName = `${this.endpoint}/${topic}`; 
    return this._mqttService.publish(topicName, message);    
  }
}
