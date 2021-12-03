import { Component, OnInit } from '@angular/core'
import { FamilyManagementService } from 'src/app/services/family-management.service'

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  constructor(public familyManagement: FamilyManagementService) { }

  ngOnInit(): void {
    this.familyManagement.getAllFamilyMembersData()
  }

}
