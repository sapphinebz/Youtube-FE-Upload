import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Upload';

  uploadFn = (http: HttpClient, formData: FormData) => {
    return http.post(`http://localhost:3000/upload/multiples`, formData).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  };
}
