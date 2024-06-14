import { Component, Inject, Input, PLATFORM_ID, OnInit, OnDestroy, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-toast-component',
  standalone: true,
  imports :[
    CommonModule,
  ],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() message: string = '';
  @Input() type: string = 'info';
  @Input() duration: number = 5000 ;
  @Input() title: string = ''
  @Output() close = new EventEmitter<void>();

  progress: number = 100;
  intervalId: any;
  paused: boolean = false;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.startTimer();
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        const toast = document.getElementById('toast-success');
        if (toast) {
          toast.classList.add('show');
        }
      }, 0);
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startTimer() {
    if (this.isBrowser) {
      const interval = this.duration / 100; // Divide duration into 100 parts
      this.intervalId = setInterval(() => {
        if (!this.paused) {
          this.progress -= 1;
          if (this.progress <= 0) {
            clearInterval(this.intervalId);
            this.closeToast();
          }
        }
      }, interval);
    }
  }

  pauseBar() {
    this.paused = true;
  }

  resumeBar() {
    this.paused = false;
  }

  triggerCloseAnimation() {
    const toast = document.getElementById('toast-success');
    if (toast) {
      toast.classList.add('fade-out');
      setTimeout(() => {
        this.close.emit();
      }, 500); // Duration should match the CSS animation duration
    }
  }

  closeToast() {
    clearInterval(this.intervalId);
    this.triggerCloseAnimation();
  }
}