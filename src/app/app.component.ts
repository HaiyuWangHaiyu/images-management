import { Component } from '@angular/core';

@Component({
  selector: 'app-my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user = 'Alva';
  loginUrl = 'login.html';
}
