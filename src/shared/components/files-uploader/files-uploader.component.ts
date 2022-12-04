import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EMPTY, Subject } from 'rxjs';
import { catchError, exhaustMap } from 'rxjs/operators';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-files-uploader',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './files-uploader.component.html',
  styleUrls: ['./files-uploader.component.scss'],
})
export class FilesUploaderComponent implements OnInit {
  clickUpload$ = new Subject<FormData>();
  files: File[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.clickUpload$
      .pipe(
        exhaustMap((formData) => {
          return this.http
            .post(`http://localhost:3000/upload/multiples`, formData)
            .pipe(
              catchError((err) => {
                console.error(err);
                return EMPTY;
              })
            );
        })
      )
      .subscribe(() => {
        this.files = [];
      });
  }

  selectedFile(inputElement: HTMLInputElement) {
    const files: FileList | null = inputElement.files;
    if (files && files.length > 0) {
      for (const file of Array.from(files)) {
        this.files.push(file);
      }

      inputElement.value = '';
    }
  }

  clickCancel() {
    this.files = [];
  }

  clickUpload() {
    if (this.files.length > 0) {
      const formData = new FormData();
      this.files.forEach((file) => {
        if (file && file.size > 0) {
          formData.append('files', file);
        }
      });
      this.clickUpload$.next(formData);
    }
  }
}
