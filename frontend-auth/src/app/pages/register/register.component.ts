import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, MessageModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = { nombre: '', apellido: '', correo: '', password: '' };
  qrCodeUrl: string | null = null;
  message: string | null = null;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    this.error = null;
    this.message = null;
    try {
      const response = await this.authService.register(this.user).toPromise();
      this.message = 'Usuario registrado exitosamente. Escanea el código QR con Google Authenticator.';
      this.qrCodeUrl = await QRCode.toDataURL(response.qr_url);
      this.authService.setAuthStatus(false); // Asegura que el header no muestre "Inicio"
    } catch (error: any) {
      this.error = error.error?.message || 'Error en el servidor';
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}