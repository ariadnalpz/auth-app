import { Component } from '@angular/core';
     import { CommonModule } from '@angular/common';
     import { FormsModule } from '@angular/forms';
     import { InputTextModule } from 'primeng/inputtext';
     import { ButtonModule } from 'primeng/button';
     import { MessageModule } from 'primeng/message';
     import { AuthService } from '../../services/auth.service';
     import { Router } from '@angular/router';

     @Component({
       selector: 'app-login',
       standalone: true,
       imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, MessageModule],
       templateUrl: './login.component.html',
       styleUrls: ['./login.component.css']
     })
     export class LoginComponent {
       credentials = { correo: '', password: '', token_2fa: '' };
       message: string | null = null;
       error: string | null = null;

       constructor(private authService: AuthService, private router: Router) {}

       login() {
         this.error = null;
         this.message = null;
         this.authService.login(this.credentials).subscribe({
           next: (response) => {
             this.message = response.message;
             localStorage.setItem('token', response.token);
             this.authService.setAuthStatus(true); // Notifica que el usuario está autenticado
             this.router.navigate(['/home']);
           },
           error: (error) => {
             this.error = error.error?.message || 'Error en el servidor';
           }
         });
       }
     }