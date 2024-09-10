import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {User} from "../../utils/user.type";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
  })

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  handleSubmit() {
    const user = this.form.value as User;
    this.authService.register(user)
      .subscribe({
        next: (res) => {
          if(res) {
            this.router.navigate(['/login'])
          }
        }
      })
  }
}
