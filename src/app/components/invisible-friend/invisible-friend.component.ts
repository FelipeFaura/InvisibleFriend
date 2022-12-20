import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { FamilyMember } from 'src/app/Models/familyMember'
import { FamilyManagementService } from 'src/app/services/family-management.service'

@Component({
  selector: 'app-invisible-friend',
  templateUrl: './invisible-friend.component.html',
  styleUrls: ['./invisible-friend.component.scss'],
})
export class InvisibleFriendComponent implements OnInit {
  public dataBaseFamily: FamilyMember[]
  public selectedMember: FamilyMember
  public selectedPhoto: string
  public repitedQuery = false
  public isButtonClicked = false
  constructor(
    public familyManagement: FamilyManagementService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getDataFamilyMembers()
  }

  private getDataFamilyMembers() {
    this.dataBaseFamily = []
    this.familyManagement.getFamilyMembers().subscribe((member) => {
      member.forEach((memberData: any) => {
        if (memberData.payload.doc.data().assigned === false) {
          this.dataBaseFamily.push(
            new FamilyMember(
              memberData.payload.doc.id,
              memberData.payload.doc.data().name,
              memberData.payload.doc.data().assigned,
              memberData.payload.doc.data().picture,
              memberData.payload.doc.data().code,
              memberData.payload.doc.data().invisibleFriend
            )
          )
        }
      })
    })
  }

  private getRandomMember() {
    this.dataBaseFamily = this.dataBaseFamily.filter(
      (x) => x.name !== this.familyManagement.currentUser.name
    )
    this.selectedMember =
      this.dataBaseFamily[
        Math.floor(Math.random() * this.dataBaseFamily.length)
      ]
  }

  public choose() {
    this.isButtonClicked = true
    this.getPhotoPath(this.selectedMember.name)
    this.familyManagement.updateAssigned(this.selectedMember.id)
    this.familyManagement.updateInvisibleFriend(
      this.familyManagement.currentUser.id,
      this.selectedMember.name
    )
  }

  public selectInvisibleFriend() {
    if (this.familyManagement.currentUser.invisibleFriend) {
      this.repitedQuery = true
      this.getPhotoPath(this.familyManagement.currentUser.invisibleFriend)
    } else {
      this.getRandomMember()
      this.choose()
    }
    this.familyManagement.updateAppConnection(false)
  }

  private getPhotoPath(name: string) {
    switch (name) {
      case 'Cristina':
        this.selectedPhoto = '../../../assets/cristina.PNG'
        break
      case 'Verónica':
        this.selectedPhoto = '../../../assets/Vero2.PNG'
        break
      case 'Mamá':
        this.selectedPhoto = '../../../assets/mama.jpg'
        break
      case 'Papá':
        this.selectedPhoto = '../../../assets/papa.jpg'
        break
      case 'Felipe':
        this.selectedPhoto = '../../../assets/felipe.jpg'
        break
    }
  }
}
