import { Component, OnInit } from '@angular/core'
import { FamilyManagementService } from './services/family-management.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'InvisibleFriend'


  constructor(public familyManagementService: FamilyManagementService){

  }
  ngOnInit() {
  }


}
