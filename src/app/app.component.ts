import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  appPages =[
  {
    title: 'Country Dashboard',
    url: '/',
  },{
    title: 'Cities Dashboard',
    url: '/cities',
  },
]
  title = 'weather-angular';
}
