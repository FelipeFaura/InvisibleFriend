import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogWishData } from '../wish-list.component'

@Component({
  selector: 'app-wish-dialog',
  templateUrl: './wish-dialog.component.html',
  styleUrls: ['./wish-dialog.component.scss'],
})
export class WishDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<WishDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogWishData
  ) {}

  ngOnInit(): void {}

  public onNoClick(): void {
    this.dialogRef.close()
  }
}
