import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ImageListComponent } from './image-list.component';
import { AddBtnComponent, AddModalComponent } from './add-panel.component';
import { UpdateBtnComponent, UpdateModalComponent } from './update-panel.component';
import { DeleteBtnComponent } from './delete-btn.component';



@NgModule({
  declarations: [
    AppComponent,
    ImageListComponent,
    AddBtnComponent,
    AddModalComponent,
    UpdateBtnComponent,
    UpdateModalComponent,
    DeleteBtnComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddModalComponent,
    AddBtnComponent,
    UpdateBtnComponent,
    UpdateModalComponent
  ]
})
export class AppModule { }
