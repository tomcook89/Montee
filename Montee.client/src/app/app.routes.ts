import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { ResMortgagesComponent } from './res-mortgages/res-mortgages.component';
import { BuyToLetComponent } from './buy-to-let/buy-to-let.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {   
        path:'',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            {path: 'members', component: MemberListComponent},
            {path: 'members/:id', component: MemberDetailComponent},
            {path: 'lists', component: ListsComponent},
            {path: 'res-mortgages', component: ResMortgagesComponent},
            {path: 'buy-to-let', component: BuyToLetComponent}
        ]
    },
    {path: '**', component: HomeComponent, pathMatch: 'full'}
];
