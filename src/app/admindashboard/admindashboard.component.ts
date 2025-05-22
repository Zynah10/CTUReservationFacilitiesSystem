import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [CommonModule], 
 template: `
  <div class="dashboard-container">
    <h1>Admin Dashboard</h1>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <button (click)="approvedreservationlist()">View Approved Reservations</button>
      <button (click)="logout()" style="background-color: red; color: white;">Logout</button>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Facility</th>
            <th>Reservation In</th>
            <th>Reservation Out</th>
            <th>User</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let reservation of pendingReservations">
            <td>{{ reservation.facility }}</td>
            <td>{{ reservation.reservationIn }}</td>
            <td>{{ reservation.reservationOut }}</td>
            <td>{{ reservation.firstName }} {{ reservation.lastName }}</td>
            <td>{{ reservation.status }}</td>
            <td class="actions">
              <button class="approve-btn" (click)="approveReservation(reservation.id)">Approve</button>
              <button class="reject-btn" (click)="rejectReservation(reservation.id)">Reject</button>
            </td>
          </tr>
          <tr *ngIf="pendingReservations.length === 0">
            <td colspan="6" style="text-align: center;">No pending reservations</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
`,
  styleUrls: ['./adminstyle.css']
})

export class AdmindashboardComponent implements OnInit {
  pendingReservations: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadPendingReservations();
  }

  loadPendingReservations() {
    const data = localStorage.getItem('reservations');
    const allReservations = data ? JSON.parse(data) : [];
    this.pendingReservations = allReservations.filter((r: any) => r.status === 'pending');
  }

  approveReservation(id: string) {
    this.updateStatus(id, 'approved');
  }

  rejectReservation(id: string) {
    this.updateStatus(id, 'rejected');
  }

  updateStatus(id: string, newStatus: string) {
    const data = localStorage.getItem('reservations');
    let reservations = data ? JSON.parse(data) : [];
    const index = reservations.findIndex((r: any) => r.id === id);
    if (index !== -1) {
      reservations[index].status = newStatus;
      localStorage.setItem('reservations', JSON.stringify(reservations));
      this.loadPendingReservations();
    }
  }

  logout() {

    this.router.navigate(['/login']);
  }

  approvedreservationlist() {
  this.router.navigate(['/approvedreservationlist']);
}

}
