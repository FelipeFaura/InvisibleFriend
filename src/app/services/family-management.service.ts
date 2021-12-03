import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { ConnectionStatus } from '../constants/constants'
import { FamilyMember } from '../Models/familyMember'

@Injectable({
  providedIn: 'root'
})
export class FamilyManagementService {
  public dataBaseFamily: FamilyMember[]
  public currentUser: FamilyMember
  public statusConnection = ConnectionStatus.NONE

  constructor(private firestore: AngularFirestore) { }

  public getFamilyMembers(){
    return this.firestore.collection('family').snapshotChanges()
  }

  public updateAssigned(id: string){
    return this.firestore.collection('family')
    .doc(id)
    .set({assigned: true}, {merge: true})
  }

  public updateInvisibleFriend(id: string, name: string){
    return this.firestore.collection('family')
    .doc(id)
    .set({invisibleFriend: name}, {merge: true})
  }

  public resetAssigned(id: string){
    return this.firestore.collection('family')
    .doc(id)
    .set({assigned: false, invisibleFriend: ""}, {merge: true})
  }

  public resetAllFamilyMembers(){
    this.dataBaseFamily = []
    this.resetAssigned('0')
    this.resetAssigned('1')
    this.resetAssigned('2')
    this.resetAssigned('3')
    this.resetAssigned('4')
  }

  public getUser(userCode: string): void {
    this.getFamilyMembers().subscribe((member) => {
      let userFound: FamilyMember = null
      member.forEach((memberData: any) => {
        if (memberData.payload.doc.data().code === userCode) {
          userFound = new FamilyMember
            (
              memberData.payload.doc.id,
              memberData.payload.doc.data().name,
              memberData.payload.doc.data().assigned,
              memberData.payload.doc.data().picture,
              memberData.payload.doc.data().code,
              memberData.payload.doc.data().invisibleFriend,
            )
        }
      })
      userFound ? this.connectUser(userFound) : this.connectUser(null)
    })
  }

  public getAllFamilyMembersData() {
    this.dataBaseFamily = []
    this.getFamilyMembers().subscribe((member) => {
      member.forEach((memberData: any) => {
          this.dataBaseFamily.push(
            new FamilyMember(
              memberData.payload.doc.id,
              memberData.payload.doc.data().name,
              memberData.payload.doc.data().assigned,
              memberData.payload.doc.data().picture,
              memberData.payload.doc.data().code,
              memberData.payload.doc.data().invisibleFriend,
            )
          )
      })
    })
  }

  public connectUser(user: FamilyMember): void{
    if (user === null){
      this.changeStatus(ConnectionStatus.WRONG_PASSWORD)
      return
    }
    if (this.currentUser){
      this.changeStatus(ConnectionStatus.USER_CONECTED)
      return
    }
    this.currentUser = user
    this.changeStatus(ConnectionStatus.CONNECTION_ESTABLISHED)
  }

  public disconnectUser(): void{
    this.currentUser = null
  }

  private changeStatus(status: ConnectionStatus): void{
    this.statusConnection = status
  }
}
