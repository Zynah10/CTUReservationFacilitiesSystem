import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  signup() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      alert("Please fill out all fields.");
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(user));
    alert("Account created successfully!");

    // Redirect to login
    this.router.navigate(['/login']);
  }

  login() {
    this.router.navigate(['/login']);
  }
}
