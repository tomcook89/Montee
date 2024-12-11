import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AccountsService } from '../_services/accounts.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  private accountService = inject(AccountsService);
  loggedIn = false;
  model: any = {}

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        this.loggedIn = true;
      },
      error: error => console.log(error)
    })
  }
}
