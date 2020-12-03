import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { zip } from 'rxjs';
import { FamilyMember } from 'src/app/Models/familyMember';
import { FamilyManagementService } from 'src/app/services/family-management.service';

@Component({
  selector: 'app-invisible-friend',
  templateUrl: './invisible-friend.component.html',
  styleUrls: ['./invisible-friend.component.scss']
})
export class InvisibleFriendComponent implements OnInit {
  public dataBaseFamily: FamilyMember[]
  public selectedMember: FamilyMember 
  public selectedPhoto: string
  public isLogged = false
  private memberLogged: string

  public isButtonClicked = false
  constructor(private familyManagement: FamilyManagementService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.getDataFamilyMembers()

  }


  private getDataFamilyMembers() {
    this.dataBaseFamily = []
    this.familyManagement.getFamilyMembers().subscribe((member) =>{
      member.forEach((memberData: any) => {
        if (memberData.payload.doc.data().assigned === false) {
          this.dataBaseFamily.push(
            new FamilyMember(
              memberData.payload.doc.id,
              memberData.payload.doc.data().name,
              memberData.payload.doc.data().assigned,
              memberData.payload.doc.data().picture,
            )
          );
        }
      });
    })
  }

  private getRandomMember(){
    this.dataBaseFamily = this.dataBaseFamily.filter(x => x.name !== this.memberLogged)    
    this.selectedMember = this.dataBaseFamily[Math.floor(Math.random() * this.dataBaseFamily.length)]
  }

  public choose(){
    this.isButtonClicked = true
    this.getPhotoPath(this.selectedMember.name)
    this.familyManagement.updateAssigned(this.selectedMember.id)
  }

  public selectLoginMember(name: string){
    this.memberLogged = name
    this.getRandomMember()
    this.isLogged = true
  }

  private getPhotoPath(name: string){
    switch (name) {
      case "Cristina":
        this.selectedPhoto = "../../../assets/cristina.PNG"
        break;
      case "Verónica":
        this.selectedPhoto = "../../../assets/Vero2.PNG"
        break;
      case "Mamá":
        this.selectedPhoto = "../../../assets/mama.jpg"
        break;
      case "Papá":
        this.selectedPhoto = "../../../assets/papa.jpg"
        break;
      case "Felipe":
        this.selectedPhoto = "../../../assets/felipe.jpg"
        break;
    } 
  }
}
