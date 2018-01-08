import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ServicesHealthService } from '../services/index';

@Component({
  selector: 'app-service-discovery',
  templateUrl: './service-discovery.component.html',
  styleUrls: ['./service-discovery.component.css']
})
export class ServiceDiscoveryComponent implements OnInit, AfterViewInit {
  public serviceData = [];
  public isConnected = false;
  public connectedButtonId: string;

  @Output() onServicePicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(private servicesHealthService: ServicesHealthService) { }

  ngOnInit() {
    this.discoverService();
  }

  ngAfterViewInit() {
    this.isConnected = JSON.parse(localStorage.getItem('CONNECTED_SERVICE_STATE'));
    this.connectedButtonId = localStorage.getItem('CONNECTED_SERVICE_ID');
  }

  discoverService() {
    let serviceRecord = [];
    this.servicesHealthService.servicesDiscover()
      .subscribe(
      (data) => {
        Object.keys(data).forEach(function (key) {
          serviceRecord.push({
            key: key,
            [key]: data[key]
          })
        });
        this.serviceData = serviceRecord;
      },
      (error) => {
        console.log('error: ', error);
      });
  }

  connectService(service) {
    this.connectedButtonId = service.key;
    this.isConnected = true;
    localStorage.setItem('CONNECTED_SERVICE_STATE', JSON.stringify(this.isConnected));
    localStorage.setItem('CONNECTED_SERVICE_ID', this.connectedButtonId);
    this.onServicePicked.emit(service)
  }
}
