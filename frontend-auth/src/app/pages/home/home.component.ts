import { Component } from '@angular/core';
     import { CommonModule } from '@angular/common';
     import { CardModule } from 'primeng/card';

     @Component({
       selector: 'app-home',
       standalone: true,
       imports: [CommonModule, CardModule],
       templateUrl: './home.component.html',
       styleUrls: ['./home.component.css']
     })
     export class HomeComponent {}