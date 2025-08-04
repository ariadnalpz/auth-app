import { Routes } from '@angular/router';
     import { RegisterComponent } from './pages/register/register.component';
     import { LoginComponent } from './pages/login/login.component';
     import { HomeComponent } from './pages/home/home.component';
     import { TestComponent } from './pages/test/test.component';
     import { authGuard } from './guards/auth.guard';

     export const routes: Routes = [
       { path: '', redirectTo: '/login', pathMatch: 'full' },
       { path: 'register', component: RegisterComponent },
       { path: 'login', component: LoginComponent },
       { path: 'home', component: HomeComponent, canActivate: [authGuard] },
       { path: 'test', component: TestComponent }
     ];