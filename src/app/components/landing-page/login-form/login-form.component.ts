import { Component,Output,EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  
  @Output() login: EventEmitter<User> = new EventEmitter();


  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService,
  ){}
  
  public loginSubmit(LoginForm: NgForm): void {
    const username = LoginForm.value.username; 
    this.loginService.login(username)
    .subscribe({
      next: (user: User) => {
        //Redirect to trainer page
        this.userService.user = user;
        this.login.emit(user);
      
      },
      error: () => {
        //console.log(err);
      }
    });
  }
}