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
    this.buildSubscribers();
  }

  buildSubscribers() {
    this.databaseSubscribers = [];

    this.firebaseService.getDatabaseSubscribers().then((subscribers) => {
      for (const id in subscribers) {
        this.databaseSubscribers.push({id: id, email: subscribers[id].email, timestamp: subscribers[id].timestamp});
      }
    }).catch((e) => {
      console.error(e);
    });
  }

  addFirestoreSubscriber() {
    this.firebaseService.createFirestoreSubscriber(this.email)
      .then((res)=>{
        console.log("Subscriber created in firestore!");
        alert("Thanks for subscribing! " + this.email);
      }).catch((e) => {
        console.error(e);
        alert("Subscriber was not added");
      });

    this.email = "";
  }

  addDatabaseSubscriber() {
    const email = this.email;

    this.firebaseService.createDatabaseSubscriber(email, this.databaseSubscribers)
      .then(() =>{
        console.log("Subscriber created in database! " + email);
        alert("Thank you for subscribing! " + email);
        this.buildSubscribers();
      }).catch((e) => {
        console.error(e);
        if (e.includes("already")) {
          alert("Thank you for subscribing! " + email);
        } else {
          alert("Oops! Something went wrong. Please try subscribing again.")
        }
    });

    this.email = "";
  }

  deleteDatabaseSubscriber(id: string) {
    this.firebaseService.deleteDatabaseSubscriber(id).then(() => {
      console.log("successful delete");
      this.buildSubscribers();
    }).catch((e) => {
      console.error(e);
    });


  }

}
