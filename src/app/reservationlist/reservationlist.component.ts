import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
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
  selector: 'app-reservationlist',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './reservationlist.html',
  styleUrls: ['./reservationlist.css'],
})
export class ReservationlistComponent {
  reservations: Reservation[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    const storedReservations = localStorage.getItem('reservations');
    if (storedReservations) {
      this.reservations = JSON.parse(storedReservations);
    }
  }

  cancelReservation(index: number) {
    if (confirm('Are you sure you want to cancel this reservation?')) {
      this.reservations.splice(index, 1);
      localStorage.setItem('reservations', JSON.stringify(this.reservations));
    }
  }

  editReservation(index: number) {
    const res = this.reservations[index];

    if (res.status === 'approved') {
      alert('This reservation is approved and cannot be edited.');
      return;
    }

    const newFacility = prompt('Edit Facility:', res.facility);
    const newFrom = prompt('Edit Reservation In:', res.reservationIn);
    const newTo = prompt('Edit Reservation Out:', res.reservationOut);

    if (newFacility === null || newFrom === null || newTo === null) {
      // User cancelled prompt, do not update
      return;
    }

    res.facility = newFacility;
    res.reservationIn = newFrom;
    res.reservationOut = newTo;

    localStorage.setItem('reservations', JSON.stringify(this.reservations));
    alert('Reservation updated successfully!');
  }

  goBack() {
    this.router.navigate(['/homepage']);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
