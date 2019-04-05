import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  email: string;
  subscribers: string[] = [];

  constructor(public navCtrl: NavController) {

  }

  addSubscriber() {
    console.log(this.email);
    this.subscribers.push(this.email);

    alert("Thanks for subscribing! " + this.email);
    this.email = "";
  }

}
