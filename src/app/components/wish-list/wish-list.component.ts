import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { FamilyManagementService } from 'src/app/services/family-management.service'
import { WishDialogComponent } from './wish-dialog/wish-dialog.component'

export interface DialogWishData {
  wish: string
}

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit {
  public wishAdded: string
  public wishListed: {}
  constructor(
    public familyManagement: FamilyManagementService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  public openDialog(): void {
    const dialogRef = this.dialog.open(WishDialogComponent, {
      data: { name: this.wishAdded },
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed')
      if (result) {
        // send wish to database
        this.familyManagement.addWish(result)
      }
      this.wishAdded = result
    })
  }

  public deleteWish(index: number) {
    this.familyManagement.deleteWish(index)
  }

  public updateWish(index: number, wish: string) {
    this.familyManagement.updateWish(index, wish)
  }
}
