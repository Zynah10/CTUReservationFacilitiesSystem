import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.css']
})
export class ReservationComponent {
  firstName = '';
  lastName = '';
  mobile = '';
  email = '';
  reservationIn = '';
  reservationOut = '';
  userType = '';
  facility = '';

  constructor(private router: Router) {}

  // Navigation
  reservationlist() {
    this.router.navigate(['reservationlist']);
  }

  homepage() {
    this.router.navigate(['homepage']);
  }

  reservation() {
    this.router.navigate(['reservation']);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onSubmit() {
    if (
      confirm(
        `Please confirm your reservation:\n
        Name: ${this.firstName} ${this.lastName}\n
        Mobile: ${this.mobile}\n
        Email: ${this.email}\n
        Reservation In: ${this.reservationIn}\n
        Reservation Out: ${this.reservationOut}\n
        User Type: ${this.userType}\n
        Facility: ${this.facility}`
      )
    ) {
      const newReservation = {
        id: uuidv4(),
        firstName: this.firstName.trim(),
        lastName: this.lastName.trim(),
        mobile: this.mobile.trim(),
        email: this.email.trim(),
        reservationIn: this.reservationIn,
        reservationOut: this.reservationOut,
        userType: this.userType,
        facility: this.facility,
        status: 'pending'
      };

      const existing = localStorage.getItem('reservations');
      const reservations = existing ? JSON.parse(existing) : [];
      reservations.push(newReservation);
      localStorage.setItem('reservations', JSON.stringify(reservations));

      alert('Reservation successful!');

      // Clear form fields
      this.firstName = '';
      this.lastName = '';
      this.mobile = '';
      this.email = '';
      this.reservationIn = '';
      this.reservationOut = '';
      this.userType = '';
      this.facility = '';
    } else {
      alert('Reservation cancelled.');
    }
  }
}
