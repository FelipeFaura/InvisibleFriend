import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FamilyMember } from '../Models/familyMember';

@Injectable({
  providedIn: 'root'
})
export class FamilyManagementService {
  constructor(private firestore: AngularFirestore) { }

  public getFamilyMembers(){
    return this.firestore.collection('family').snapshotChanges()
  }

  public updateAssigned(id: string){
    return this.firestore.collection('family')
    .doc(id)
    .set({assigned: true}, {merge: true})

  }

  
}
