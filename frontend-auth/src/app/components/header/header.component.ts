import { Component, OnInit } from '@angular/core';
     import { CommonModule } from '@angular/common';
     import { ButtonModule } from 'primeng/button';
     import { RouterLink } from '@angular/router';
     import { Router } from '@angular/router';
     import { AuthService } from '../../services/auth.service';

     @Component({
       selector: 'app-header',
       standalone: true,
       imports: [CommonModule, ButtonModule, RouterLink],
       templateUrl: './header.component.html',
       styleUrls: ['./header.component.css']
     })
     export class HeaderComponent implements OnInit {
       isAuthenticated = false;

       constructor(private authService: AuthService, private router: Router) {}

       ngOnInit() {
         this.isAuthenticated = !!localStorage.getItem('token');
         // Escuchar cambios en el estado de autenticación
         this.authService.authStatus$.subscribe((status) => {
           this.isAuthenticated = status;
         });
       }

       logout() {
         localStorage.removeItem('token');
         this.authService.setAuthStatus(false);
         this.router.navigate(['/login']);
       }
     }