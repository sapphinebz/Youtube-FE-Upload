import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MultipleFilesUploaderComponent } from 'src/shared/components/multiple-files-uploader/multiple-files-uploader.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, MultipleFilesUploaderComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
