import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AccountsService } from '../_services/accounts.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive, TitleCasePipe, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  accountService = inject(AccountsService);
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
    clearTimeout(this.hoverTimeout); // Prevent hiding while hovering
    this.showDropdown = true;
  }

  onMouseLeave() {
    this.hoverTimeout = setTimeout(() => {
      this.showDropdown = false;
    }, 200); // Small delay to allow smooth transition
  }
}
