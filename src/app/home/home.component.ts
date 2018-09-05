import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
    users: User[] = [];

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
}

  ngOnInit() {
  
  }


}
