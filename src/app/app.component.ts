import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit    {
  private destroyRef = inject(DestroyRef);

  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);

  constructor() {
    // You can initialize other properties or services here if needed
    // effect(() => {
    //   console.log('Click count changed:', this.clickCount());
    // });

  }
  
  ngOnInit() {
  // const subscribtion = interval(1000).pipe(
  //   // You can add operators here
  //   map(value => value * 2) // Example operator to double the emitted value
  // ).subscribe({
  //     next: (value) => {
  //       console.log('Interval value:', value);
  //     },
  //     error: (err) => {
  //       console.error('Error occurred:', err);
  //     },
  //     complete: () => {
  //       // This will never be called since interval is infinite
  //       console.log('Interval completed');
  //     }
  //   });

    // Using toObservable to convert a signal to an observable
    const subscribtion = this.clickCount$.subscribe({
      next: (value) => {
        console.log('Click count updated:', value);
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
      complete: () => {
        console.log('Click count observable completed');
      }
    });

    this.destroyRef.onDestroy(() => {
      console.log('Destroying subscription');
      subscribtion.unsubscribe();
    });

  }

  onClick() {
    this.clickCount.update(count => count + 1);
  }

}
