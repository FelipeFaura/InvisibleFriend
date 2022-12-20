import { Component, OnInit } from '@angular/core'
import { ConnectionStatus } from 'src/app/constants/constants'
import { FamilyMember } from 'src/app/Models/familyMember'
import { FamilyManagementService } from 'src/app/services/family-management.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public controlPanel = false
  public hidePassword = true
  public password: string
  public selectedMember: FamilyMember
  constructor(public familyManagementService: FamilyManagementService) {}

  ngOnInit(): void {}

  public async connect(password: string): Promise<void> {
    if (password === '54328') {
      this.controlPanel = true
    }
    this.familyManagementService.checkDatabaseAvailable()
    this.familyManagementService.getUser(password)
  }
}
