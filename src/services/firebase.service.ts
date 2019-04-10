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

  getDatabaseSubscribers() {
    return new Promise<any>((resolve, reject) => {
      this.fireDatabase.database.ref().once('value', (snapshot) => {
        if (snapshot.hasChildren()) {
          resolve(snapshot.val().subscribers);
        } else {
          reject("No database subscribers.");
        }
      }, (error) => {
        reject(error);
      });
    })
  }

  createDatabaseSubscriber(email: string, subscribers: Subscriber[]): Promise<any> {
    if (JSON.stringify(subscribers).toString().includes(email)) {
      return new Promise(((resolve, reject) => {
        reject(email + " has already subscribed.")
      }));
    } else {
      return this.fireDatabase.database.ref('subscribers').push().set({
        email: email,
        timestamp: Date.now().valueOf()
      });
    }
  }

  createFirestoreSubscriber(email: string) {
    return this.firestore.collection('subscribers').add({
      email: email,
      timestamp: Date.now().valueOf()
    });
  }

  deleteDatabaseSubscriber(id: string) {
    return this.fireDatabase.database.ref('subscribers/' + id).remove();
  }
}
