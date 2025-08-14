import { Component, OnInit } from '@angular/core';

import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit    {
  ngOnInit() {
    interval(1000).subscribe({
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
  }

}
