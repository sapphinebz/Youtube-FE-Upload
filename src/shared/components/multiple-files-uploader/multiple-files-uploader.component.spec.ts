import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleFilesUploaderComponent } from './multiple-files-uploader.component';

describe('MultipleFilesUploaderComponent', () => {
  let component: MultipleFilesUploaderComponent;
  let fixture: ComponentFixture<MultipleFilesUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MultipleFilesUploaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleFilesUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
