import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthRequest } from 'src/app/models/interfaces/users/auth/AuthResquest';
import { SignUpUserRequest } from 'src/app/models/interfaces/users/SignUpUserRequest';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  singUpForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,

  ){
  }

  onSubmitLoginForm():void{
    if(this.loginForm.value && this.loginForm.valid){
      this.userService.authUser(
        this.loginForm.value as AuthRequest
      ).subscribe({
        next: (response) => {
          if(response){
            this.cookieService.set('USER_INFO', response?.token);

            this.loginForm.reset();
          }
        },
        error: (err) => console.log(err)
      });
    }
  }

  onSubmitSignUpForm():void{
  if(this.singUpForm.value && this.singUpForm.valid){
    this.userService.signUpUser(
      this.singUpForm.value as SignUpUserRequest
    ).subscribe({
      next: (response) => {
        if(response){
          alert('Usuário teste criado com sucesso!');
          this.singUpForm.reset();
          this.loginCard = true;
        }
      },
      error: (err) => console.log(err)
    })
  }
  }
}
