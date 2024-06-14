import { Component, ViewChild, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IndexService } from '../../api/index.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppToastService } from '../../shared/services/toast.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private indexService = inject(IndexService)
  private toastService = inject(AppToastService)

  form!: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router) {
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(){
    const {user, password} = this.form.controls
    if(this.form.invalid){
      this.toastService.error('Campos incompletos','Por favor rellene todos los campos')
      return
    }
    this.indexService.loginUser(user.value,password.value).
    subscribe({
      next: data => {
        localStorage.setItem('access_token', 'bearer' + JSON.stringify((data.access_Token)))
        this.router.navigateByUrl('dashboard')
      },
      error: error => {
        this.toastService.error('Error al iniciar sesión','Usuario o contraseña incorrecto')
      }
    })
  }
}
