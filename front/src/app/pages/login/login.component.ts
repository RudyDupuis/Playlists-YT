import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(user).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.errorMessage =
          error.error.message || 'Erreur lors de la connexion';
      },
    });
  }
}
