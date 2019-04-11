import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { DifficultyComponent } from './difficulty/difficulty.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { AuthGuard} from './auth.guard';
import { BoardComponent } from './board/board.component';

//This is my case
const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        //canActivate: [AuthGuard]
    },
    {
        path: 'about',
        component: AboutComponent,
        canActivate: [AuthGuard] // Testing for guarded routes, navigates only if logged in
    },
    {
        path: 'difficulty',
        component: DifficultyComponent,
        //canActivate: [AuthGuard]
    },
    {
        path: 'leaderboard',
        component: LeaderboardComponent,
        //canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'board',
        component: BoardComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
