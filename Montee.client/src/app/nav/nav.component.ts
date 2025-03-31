import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HasRoleDirective } from '../_directives/has-role.directive';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive, CommonModule, HasRoleDirective],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  accountService = inject(AccountService);
  private router = inject(Router)
  private toastr = inject(ToastrService)
  model: any = {}
  showDropdown = false;
  private hoverTimeout: any;

  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/res-mortgages')
      },
      error: error => this.toastr.error(error.error.message)
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

  onMouseEnter() {
    clearTimeout(this.hoverTimeout);
    this.showDropdown = true;
  }

  onMouseLeave() {
    this.hoverTimeout = setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  hideDropdown() {
    this.showDropdown = false;
  }
}
