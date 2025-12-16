import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showErrorMessage = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.showErrorMessage = false;
      console.log('Login realizado com:', this.loginForm.value);
      // Aqui você pode chamar seu AuthService
    } else {
      this.showErrorMessage = true; // mostra mensagem de erro 
      this.loginForm.markAllAsTouched(); // deixa inputs vermelhos 
    }
  }

  closeErrorMessage() {
    this.showErrorMessage = false;
    // Remove as bordas vermelhas dos inputs
    this.loginForm.markAsUntouched();
  }

  loginWith(provider: string) {
    console.log(`Login com ${provider}`);
    // Chamar serviço de autenticação social
  }
}
