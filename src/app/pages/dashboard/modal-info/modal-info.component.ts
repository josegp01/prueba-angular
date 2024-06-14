import { Component, effect, ElementRef, EventEmitter, inject, Inject, Input, Output, ViewChild, } from '@angular/core';
import { IndexService } from '../../../api/index.service';
import { CommonModule } from '@angular/common';
import { AppToastService } from '../../../shared/services/toast.service';


@Component({
  selector: 'app-modal-info',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './modal-info.component.html',
  styleUrl: './modal-info.component.scss'
})
export class ModalInfoComponent {
  @ViewChild('checkboxContainer') checkboxContainer!: ElementRef;
  private toastService = inject(AppToastService)
  private indexService = inject(IndexService)
  @Output() close = new EventEmitter<void>();
  @Input() id:string = '';
  @Input() flag: string = ''
  @Input() name: string = ''
  closing = false;
  loading:boolean = false;
  data:any = []
  selectedIds: string[] = [];
  ngOnInit(){
    
    this.getSchedule(this.id, this.flag)
  }

  closeModal() {
    this.closing = true;
    setTimeout(() => {
      this.close.emit();
      this.closing = false;
    }, 300); 
  }

  getSchedule(id:string,flag:string){
    this.loading = true
    this.indexService.getSchedule(id,flag).subscribe(data=>{
      this.loading = false
      this.data = data.objModel
    })
  }

  validate(idPayment: string, accepted: number) {
    const reasonReject:any = {
       id: idPayment,
       Detalle: accepted ===1 ? '' : "EL CÓDIGO DE OPERACIÓN ES INCORRECTO O NO EXISTE"
    }
    const arrayId=[
      idPayment
    ]
    this.indexService.validate(this.id,arrayId,accepted,reasonReject).
    subscribe({
      next: data => {
        console.log(data);
        
      },
      error: error => {
        console.log(error.error.description);
        
        this.toastService.error('Error', error.error.description)
      }
    })
  }

}
