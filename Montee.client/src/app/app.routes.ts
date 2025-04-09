import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { ResMortgagesComponent } from './res-mortgages/res-mortgages.component';
import { BuyToLetComponent } from './buy-to-let/buy-to-let.component';
import { CalculatorsComponent } from './calculators/calculators/calculators.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { authGuard } from './_guards/auth.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { adminGuard } from './_guards/admin.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandlordCalculatorsComponent } from './calculators/landlord-calculators/landlord-calculators.component';
import { FirstTimeBuyerMortgagesComponent } from './res-mortgages/first-time-buyer-mortgages/first-time-buyer-mortgages.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {   
        path:'',
        runGuardsAndResolvers: 'always',
        //canActivate: [authGuard],
        children: [
            {path: 'members', component: MemberListComponent},
            {path: 'members/:id', component: MemberDetailComponent},
            {path: 'lists', component: ListsComponent},
            {path: 'res-mortgages', component: ResMortgagesComponent},
            {path: 'buy-to-let', component: BuyToLetComponent},
            {path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard]},
            {path: 'register', component: RegisterComponent},
            {path: 'login', component: LoginComponent}
        ]
    },
    {path: 'buyer-calculators', component: CalculatorsComponent},
    {path: 'landlord-calculators', component: LandlordCalculatorsComponent},
    {path: 'first-time-buyer-mortgages', component: FirstTimeBuyerMortgagesComponent},
    {path: 'errors', component: TestErrorsComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: 'server-error', component: ServerErrorComponent},
    {path: '**', component: HomeComponent, pathMatch: 'full'}
];
