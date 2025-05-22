import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Reservation {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  reservationIn: string;
  reservationOut: string;
  userType: string;
  facility: string;
  status: string;
}

@Component({
  selector: 'app-approvedreservationlist',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="approved-reservations-container">
      <h1>Approved Reservations</h1>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Facility</th>
              <th>Reservation In</th>
              <th>Reservation Out</th>
              <th>User</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let reservation of approvedReservations">
              <td>{{ reservation.facility }}</td>
              <td>{{ reservation.reservationIn }}</td>
              <td>{{ reservation.reservationOut }}</td>
              <td>{{ reservation.firstName }} {{ reservation.lastName }}</td>
              <td>{{ reservation.status }}</td>
            </tr>
            <tr *ngIf="approvedReservations.length === 0">
              <td colspan="5" style="text-align: center;">No approved reservations found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button (click)="goBack()" class="btn-back">← Back to Admin Dashboard</button>
    </div>
  `,
  styleUrls: ['./approvedreservationlist.css'],
})
export class ApprovedReservationListComponent implements OnInit {
  approvedReservations: Reservation[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadApprovedReservations();
  }

  loadApprovedReservations() {
    const data = localStorage.getItem('reservations');
    const allReservations = data ? JSON.parse(data) : [];
    this.approvedReservations = allReservations.filter(
      (r: Reservation) => r.status === 'approved'
    );
  }

  goBack() {
    this.router.navigate(['/admindashboard']);
  }
}
