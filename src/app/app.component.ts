import { Component, DestroyRef, inject, OnInit } from '@angular/core';

import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit    {
  private destroyRef = inject(DestroyRef);
  
  ngOnInit() {
  const subscribtion = interval(1000).pipe(
    // You can add operators here
    map(value => value * 2) // Example operator to double the emitted value
  ).subscribe({
      next: (value) => {
        console.log('Interval value:', value);
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
      complete: () => {
        // This will never be called since interval is infinite
        console.log('Interval completed');
      }
    });

    this.destroyRef.onDestroy(() => {
      console.log('Destroying subscription');
      subscribtion.unsubscribe();
    });

  }

}
