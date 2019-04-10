import { Injectable } from "@angular/core";
import { Subscriber } from "../types/subscriber";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable()
export class FirebaseService {
  subscribers: Subscriber[];

  constructor(public db: AngularFirestore) {}

  public getSubscribers() {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('/subscribers').valueChanges().subscribe((values) => {
        resolve(values);
      });
    });
  }

}
