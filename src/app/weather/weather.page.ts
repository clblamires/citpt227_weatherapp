import { CurrentLocation } from './../interfaces/currentlocation';
import { WeatherService } from './../weather.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';



@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss']
})
export class WeatherPage implements OnInit {

  theWeather: any = {};
  currentData: any = {};
  day1: any = {};
  day2: any = {};
  day3: any = {};
  loading: any;
  isLoading: boolean;
  currentLocation: CurrentLocation = { lat: 0, long: 0};

  constructor( 
    public weatherService: WeatherService, 
    public loadingCtrl: LoadingController,
    private geolocation: Geolocation
  ) {
    this.presentLoader();
    this.geolocation.getCurrentPosition().then( data => {
      this.currentLocation.lat = data.coords.latitude;
      this.currentLocation.long = data.coords.longitude;
      this.currentLocation.timestamp = data.timestamp;
      console.log("Current location lat: " + this.currentLocation.lat );
      console.log("Current location longitude" + this.currentLocation.long )
      return this.currentLocation;
    }).then( currentLocation => {
      this.weatherService.getWeather( currentLocation ).then( theResult => {
        this.theWeather = theResult;
        this.currentData = this.theWeather.currently;
        this.day1 = this.theWeather.daily.data[0];
        this.day2 = this.theWeather.daily.data[1];
        this.day3 = this.theWeather.daily.data[2];
        this.dismissLoader();
      }) 
    })

    
      
  }


  async presentLoader() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: 'Loading...',
      // duration: 5000
    }).then( loader => {
      loader.present().then(() => {
        if (!this.isLoading) {
          loader.dismiss()
        }
      });
    });
  }

  async dismissLoader() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss();
  }


  doRefresh(event){
    setTimeout( ()=> {
      event.target.complete();
    }, 2000 );
  }
  


  ngOnInit() {
  }

}
