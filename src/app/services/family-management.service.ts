import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { ConnectionStatus } from '../constants/constants'
import { FamilyMember } from '../Models/familyMember'

@Injectable({
  providedIn: 'root',
})
export class FamilyManagementService {
  public dataBaseFamily: FamilyMember[]
  public currentUser: FamilyMember
  public statusConnection = ConnectionStatus.NONE
  public isAppBusy = false

  constructor(private firestore: AngularFirestore) {
    this.getAllFamilyMembersData()
  }

  public getFamilyMembers() {
    return this.firestore.collection('family').snapshotChanges()
  }

  private getUserConnection() {
    return this.firestore.collection('userConnection').snapshotChanges()
  }

  public updateAssigned(id: string) {
    return this.firestore
      .collection('family')
      .doc(id)
      .set({ assigned: true }, { merge: true })
  }

  public updateAppConnection(isConnected: boolean) {
    return this.firestore
      .collection('userConnection')
      .doc('userConnection')
      .set({ userConnected: isConnected }, { merge: true })
  }

  public updateInvisibleFriend(id: string, name: string) {
    return this.firestore
      .collection('family')
      .doc(id)
      .set({ invisibleFriend: name }, { merge: true })
  }

  public resetAssigned(id: string) {
    return this.firestore
      .collection('family')
      .doc(id)
      .set({ assigned: false, invisibleFriend: '' }, { merge: true })
  }

  public async resetAllFamilyMembers() {
    await this.resetAssigned('0')
    await this.resetAssigned('1')
    await this.resetAssigned('2')
    await this.resetAssigned('3')
    await this.resetAssigned('4')
    this.dataBaseFamily = []
  }

  public checkDatabaseAvailable() {
    this.getUserConnection().subscribe((member) => {
      member.forEach((memberData: any) => {
        if (memberData.payload.doc.data().userConnected === false) {
          this.isAppBusy = false
        } else {
          this.isAppBusy = true
        }
      })
    })
  }

  public getUser(userCode: string): void {
    this.getFamilyMembers().subscribe((member) => {
      let userFound: FamilyMember = null
      member.forEach((memberData: any) => {
        if (memberData.payload.doc.data().code === userCode) {
          userFound = new FamilyMember(
            memberData.payload.doc.id,
            memberData.payload.doc.data().name,
            memberData.payload.doc.data().assigned,
            memberData.payload.doc.data().picture,
            memberData.payload.doc.data().code,
            memberData.payload.doc.data().invisibleFriend,
            memberData.payload.doc.data().wishList
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
            memberData.payload.doc.data().wishList
          )
        )
      })
    })
  }

  public getInvisibleFriendWishList(name: string): string[] {
    return this.dataBaseFamily.filter((x) => x.name === name)[0].wishList
  }

  public connectUser(user: FamilyMember): void {
    if (user === null) {
      this.changeStatus(ConnectionStatus.WRONG_PASSWORD)
      return
    }
    if (this.isAppBusy) {
      this.changeStatus(ConnectionStatus.USER_CONECTED)
      return
    }
    this.currentUser = user
    console.log(this.currentUser)
    // this.updateAppConnection(true)
    this.changeStatus(ConnectionStatus.CONNECTION_ESTABLISHED)
  }

  public disconnectUser(): void {
    this.currentUser = null
    // this.updateAppConnection(false)
  }

  private changeStatus(status: ConnectionStatus): void {
    this.statusConnection = status
  }

  // wishList Management
  public getWishList() {}

  public addWish(wish: string) {
    const newArray = Object.assign([], this.currentUser.wishList)
    newArray.push(wish)
    return this.firestore
      .collection('family')
      .doc(this.currentUser.id)
      .set({ wishList: newArray }, { merge: true })
  }

  public updateWish(index: number, wish: string) {
    const newArray = Object.assign([], this.currentUser.wishList)
    newArray[index] = wish
    return this.firestore
      .collection('family')
      .doc(this.currentUser.id)
      .set({ wishList: newArray }, { merge: true })
  }

  public deleteWish(index: number) {
    const newArray = Object.assign([], this.currentUser.wishList)
    newArray.splice(index, 1)
    return this.firestore
      .collection('family')
      .doc(this.currentUser.id)
      .set({ wishList: newArray }, { merge: true })
  }
}
