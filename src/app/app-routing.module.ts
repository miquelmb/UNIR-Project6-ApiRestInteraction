import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { C404Component } from './pages/c404/c404.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'newuser', component: NewUserComponent },
  { path: 'user/:iduser', component: ViewUserComponent },
  { path: 'updateuser/:iduser', component: NewUserComponent },
  { path: '**', component: C404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
