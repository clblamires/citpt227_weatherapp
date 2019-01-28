import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Edit Locations',
      url: '/locations',
      icon: 'create'
    },
    {
      title: 'Current Weather',
      url: '/weather',
      icon: 'pin'
    },
    { 
      title: 'Cape Canaveral', url: '/weather', icon: 'pin', 
      loc: { lat: 28.3922, long: -80.6077 }
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
