import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController, IonSlides } from '@ionic/angular';

import { Storage } from '@ionic/storage';

@Component ({
  selector: 'page-start',
  templateUrl: 'start.html',
  styleUrls: ['./start.scss'],
})
export class StartPage {
  showSkip = true;

  @ViewChild('slides') slides: IonSlides;

  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage
  ) {}

  startApp() {
    this.router
      .navigateByUrl('/app/tabs/food')
      .then(() => this.storage.set('ion_did_start', true));
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  ionViewWillEnter() {
    this.storage.get('ion_did_start').then(res => {
      if (res === true) {
        this.router.navigateByUrl('/app/tabs/food');
      }
    });

    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the start page
    this.menu.enable(true);
  }
}
