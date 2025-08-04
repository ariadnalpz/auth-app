import { Component } from '@angular/core';
     import { CommonModule } from '@angular/common';
     import { FormsModule } from '@angular/forms';
     import { InputTextModule } from 'primeng/inputtext';
     import { ButtonModule } from 'primeng/button';

     @Component({
       selector: 'app-test',
       standalone: true,
       imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
       template: `
         <div>
           <h2>Prueba de Input y Botón</h2>
           <p-inputtext [(ngModel)]="testValue" name="test" placeholder="Escribe aquí"></p-inputtext>
           <p-button label="Probar Botón" styleClass="p-button-raised"></p-button>
         </div>
       `,
       styles: [`
         div {
           max-width: 400px;
           margin: 2rem auto;
           padding: 1rem;
         }
         p-button {
           margin-top: 1rem;
         }
       `]
     })
     export class TestComponent {
       testValue = '';
     }