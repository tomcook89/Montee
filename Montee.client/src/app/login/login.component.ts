import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  accountService = inject(AccountService);
  private router = inject(Router)
  private toastr = inject(ToastrService)
  model: any = {};

  login() {
    this.accountService.login(this.model).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: error => this.toastr.error(error.error.message)
    });
  }
}
