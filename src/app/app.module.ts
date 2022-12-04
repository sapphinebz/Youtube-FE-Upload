import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FilesUploaderComponent } from 'src/shared/components/files-uploader/files-uploader.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FilesUploaderComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
