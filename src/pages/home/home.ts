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
  databaseSubscribers: Subscriber[] = [];

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService) {
    console.log("Entering HomePage");
  }

  ngOnInit(): void {
    console.log(environment.production);
    console.log(environment.message);
    console.log(SERVER_URL);

    this.firebaseService.getDatabaseSubscribers().then((subscribers) => {
      for (const id in subscribers) {
        this.databaseSubscribers.push(subscribers[id]);
      }
      console.log(this.databaseSubscribers);
    });
  }

  addFirestoreSubscriber() {
    this.firebaseService.createFirestoreSubscriber(this.email)
      .then((res)=>{
        console.log("Subscriber created in firestore!");
        alert("Thanks for subscribing! " + this.email);
      }).catch((e) => {
        console.error(e);
        alert("Email was not valid");
      });

    this.email = "";
  }

  addDatabaseSubscriber() {
    this.firebaseService.createDatabaseSubscriber(this.email)
      .then(() =>{
        console.log("Subscriber created in database!");
        alert("Thanks for subscribing! " + this.email);
      }).catch((e) => {
        console.error(e);
        alert("Email was not valid");
    });

    this.email = "";
  }

}
