import { Component, ViewChild, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IndexService } from '../../api/index.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppToastService } from '../../shared/services/toast.service';
import { ModalInfoComponent } from './modal-info/modal-info.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,ReactiveFormsModule,ModalInfoComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private indexService = inject(IndexService)
  formulario!: FormGroup;
  loader = signal<boolean>(false);  
  data: any =[]
  isModalOpen:boolean = false;
  suscriptionSelected: { id: string, flag: string, name: string}[] = [
    { id: '', flag: '',name: '' }
  ];
  
  constructor(private formBuilder: FormBuilder,private router: Router) {
  }
  ngOnInit() {
    this.formulario = this.formBuilder.group({
      user: ['', [Validators.required, ]],
      password: ['', [Validators.required]],
    });
    this.getData()
  }

  getData(){
    this.loader.set(true);
    this.indexService.getInfo('12853').subscribe(data=>{
      this.loader.set(false);
      this.data = data.objModel.suscriptions;
      console.log(data);
    })
  }


  openModal(id:string, flag:string,name: string) {    
    this.isModalOpen = true;
    this.suscriptionSelected=[{
      id:id,
      flag:flag,
      name:name
    }]
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
