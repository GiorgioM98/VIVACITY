import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfiloComponent } from './components/profilo/profilo.component';
import { PostComponent } from './components/post/post.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [

  { path:'registrazione', component: RegistrazioneComponent},
  { path:'login', component: LoginComponent},

  {path: "", component: DashboardComponent, canActivate: [AuthGuard],  children: [
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path: "home", component: HomeComponent},
    {path: "post", component: PostComponent},
    {path: "profilo", component: ProfiloComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
