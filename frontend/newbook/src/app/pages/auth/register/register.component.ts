import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  showErrorMessage = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.showErrorMessage = false;
      console.log('Cadastro realizado com:', this.registerForm.value);
      // Aqui você pode chamar seu AuthService
    } else {
      this.showErrorMessage = true; // mostra mensagem de erro 
      this.registerForm.markAllAsTouched(); // deixa inputs vermelhos 
    }
  }

  closeErrorMessage() {
    this.showErrorMessage = false;
    // Remove as bordas vermelhas dos inputs
    this.registerForm.markAsUntouched();
  }
}
