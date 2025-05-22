import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationlistComponent } from './reservationlist/reservationlist.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ApprovedReservationListComponent } from './approvedreservationlist/approvedreservationlist.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'reservationlist', component: ReservationlistComponent },
  { path: 'admindashboard', component: AdmindashboardComponent },
  {path: 'approvedreservationlist', component:ApprovedReservationListComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64],
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
