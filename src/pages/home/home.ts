import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { environment, SERVER_URL } from "../../environments/environment";
import { FirebaseService } from "../../services/firebase.service";
import { Subscriber } from "../../types/subscriber";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  email: string;
  subscribers: string[] = [];

  databaseSubscribers: Subscriber[];

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService) {
    console.log("Entering HomePage");
    firebaseService.getSubscribers()
      .then((dbSubs: Subscriber[]) =>{
        this.databaseSubscribers = dbSubs;
        console.log(JSON.stringify(this.databaseSubscribers));
      });
  }

  ngOnInit(): void {
    console.log(environment.production);
    console.log(environment.message);
    console.log(SERVER_URL);

  }

  addSubscriber() {
    console.log(this.email);
    this.subscribers.push(this.email);

    alert("Thanks for subscribing! " + this.email);
    this.email = "";
  }

}
