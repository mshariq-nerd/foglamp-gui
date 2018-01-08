import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class ServicesHealthService {
  private GET_PING_URL = environment.BASE_URL + 'ping';
  private GET_SERVICES_URL = environment.MANAGEMENT_URL + 'service';
  private SERVICE_DISCOVER_URL = 'http://192.168.1.5:3000/foglamp/discover'; //Fix : Need to change this to service discovery server ip

  constructor(private http: Http) { }

  /**
     *  GET  | /foglamp/ping
     */
  pingService() {
    return this.http.get(this.GET_PING_URL)
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(error.json().message || 'Server error'));
  }

  /**
   *  GET  | /foglamp/service
   */
  getAllServices() {
    return this.http.get(this.GET_SERVICES_URL)
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(error.json().message || 'Server error'));
  }

  /**
   *  GET  | /foglamp/discover
   */
  servicesDiscover() {
    return this.http.get(this.SERVICE_DISCOVER_URL)
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(error.json().message || 'Server error'));
  }
}
