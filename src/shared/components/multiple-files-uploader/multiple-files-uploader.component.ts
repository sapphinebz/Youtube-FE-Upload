import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { catchError, EMPTY, exhaustMap, Subject } from 'rxjs';

@Component({
  selector: 'app-multiple-files-uploader',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './multiple-files-uploader.component.html',
  styleUrls: ['./multiple-files-uploader.component.scss'],
})
export class MultipleFilesUploaderComponent implements OnInit {
  @Input() maxItems = 5;
  /**
   * limit in MB
   */
  @Input() limitSize = 2;
  @Output() onSuccess = new EventEmitter<void>();

  filesFormArray = new FormArray<FormControl<File | null>>([]);

  uploadForm = new FormGroup({
    files: this.filesFormArray,
  });

  clickUpload$ = new Subject<FormData>();

  limitSizeValidator = (limitMB: number): ValidatorFn => {
    return (control: AbstractControl) => {
      const file: File = control.value;
      if (file) {
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > limitMB) {
          return { limitSize: true };
        }
      }
      return null;
    };
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
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
        this.filesFormArray.clear();
        this.clickAddFile();
        this.onSuccess.emit();
      });

    this.clickAddFile();
  }

  clickAddFile() {
    if (this.filesFormArray.length < this.maxItems) {
      this.filesFormArray.push(
        new FormControl(null, [
          Validators.required,
          this.limitSizeValidator(this.limitSize),
        ])
      );
    }
  }

  changeFileValue(inputFileEl: HTMLInputElement, form: FormControl) {
    form.setValue(inputFileEl.files?.[0]);
  }

  clickRemove(form: FormControl) {
    const index = this.filesFormArray.controls.indexOf(form);
    if (index > -1) {
      this.filesFormArray.removeAt(index);
    }
  }

  clickUpload() {
    this.uploadForm.markAllAsTouched();
    if (this.uploadForm.valid) {
      const rawValue = this.uploadForm.getRawValue();
      const formData = new FormData();
      rawValue.files.forEach((file) => {
        if (file && file.size > 0) {
          const formName = this.limitSize === 1 ? 'file' : 'files';
          formData.append(formName, file);
        }
      });

      this.clickUpload$.next(formData);
    }
  }
}
