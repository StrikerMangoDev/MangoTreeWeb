import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { IndustriesComponent } from './industries/industries.component';
import { TechStackComponent } from './tech-stack/tech-stack.component';
import { SocialProofComponent } from './social-proof/social-proof.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'industries', component: IndustriesComponent },
  { path: 'tech-stack', component: TechStackComponent },
  { path: 'social-proof', component: SocialProofComponent },
  { path: 'contact', component: ContactComponent }
];
