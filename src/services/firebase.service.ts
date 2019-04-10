import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import {AngularFireDatabase} from "@angular/fire/database";
import {Subscriber} from "../types/subscriber";

@Injectable()
export class FirebaseService {
  subscribers: Subscriber[] = [];

  constructor(public firestore: AngularFirestore, public fireDatabase: AngularFireDatabase) { }

  getFirestoreSubscribers() {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('/subscribers').valueChanges().subscribe((values) => {
        resolve(values);
      });
    });
  }

  printDatabaseSubscribersByEmail() {
    this.fireDatabase.database.ref().once('value').then((snapshot) => {
      snapshot.forEach((child) => {
        console.log("child " + JSON.stringify(child));
        for (const sub in child.val()) {
          console.log(child.val()[sub].email);
        }
      });
    })
  }

  getDatabaseSubscribers() {
    return new Promise<any>((resolve, reject) => {
      this.fireDatabase.database.ref().once('value', (snapshot) => {
        resolve(snapshot.val().subscribers);
      }, (error) => {
        console.error(error);
        reject({});
      });
    })
  }

  createDatabaseSubscriber(email: string): Promise<any> {
    return this.fireDatabase.database.ref('subscribers').push().set({
      email: email,
      timestamp: Date.now().valueOf()
    });
  }

  createFirestoreSubscriber(email: string) {
    return this.firestore.collection('subscribers').add({
      email: email,
      timestamp: Date.now().valueOf()
    });
  }
}
