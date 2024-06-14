import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, ComponentRef } from '@angular/core';
import { ToastComponent } from '../component/toast/toast.component';

@Injectable({ providedIn: 'root' })
export class AppToastService {
  private toastRef: ComponentRef<ToastComponent> | null = null;

  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  private createToast(title:string, message: string, type: string) {
    if (this.toastRef) {
      this.toastRef.destroy();
    }

    const factory = this.resolver.resolveComponentFactory(ToastComponent);
    this.toastRef = factory.create(this.injector);
    this.toastRef.instance.title = title;
    this.toastRef.instance.message = message;
    this.toastRef.instance.type = type;

    this.appRef.attachView(this.toastRef.hostView);
    const domElem = (this.toastRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  success(title:string, message: string) {
    this.createToast(title, message, 'success');
  }

  error(title:string, message: string) {
    this.createToast(title,message, 'error');
  }
}