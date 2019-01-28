import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  data: any = null;

  constructor( public http: Http ) {
    console.log("Service running!");

  }

  load(  currentLocation ) {
    if ( this.data ){
      return Promise.resolve( this.data );
    }

    return new Promise (resolve => {
      // this.http.get("assets/data/data.json")
      let lat = currentLocation.lat;
      let long = currentLocation.long;
      this.http.get("/forecast/278fa12363b54488a9f65f9f950267ac/" + lat + "," + long )
        .map ( res => res.json() )
        .subscribe( data => {
          this.data = data;
          resolve(this.data);
        })
    })
  }

  getWeather( currentLocation ){
    return this.load( currentLocation ).then(data => {
      return data;
    })
  }
}
