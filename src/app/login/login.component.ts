import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  Email = '';
  Password = '';

  constructor(private router: Router) {}

onSubmit(): void {
  const emailTrimmed = this.Email.trim();
  const passwordTrimmed = this.Password.trim();

  const adminEmail = 'admin@gmail.com';
  const adminPassword = 'admin123';

  if (emailTrimmed === adminEmail && passwordTrimmed === adminPassword) {
    this.router.navigate(['/admindashboard']).catch(err => console.error(err));
    return;
  }

  const storedUser = localStorage.getItem('user');

  if (storedUser) {
    const user = JSON.parse(storedUser);

    if (user.email === emailTrimmed && user.password === passwordTrimmed) {
      this.router.navigate(['/homepage']).catch(err => console.error(err));
    } else {
      alert('Invalid email or password. Please try again.');
    }
  } else {
    alert('No user account found. Please sign up first.');
  }
}

  signup(): void {
    this.router.navigate(['/signup']);
  }
}
