import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {User} from '../../interfaces/User';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  isLoading: boolean;
  // loading spinner
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  users: User;

  constructor( private userService: UserService) {
    this.reset();
  }

  private reset() {}

  ngOnInit(): void {
  this.subscribeToEvents();
  }

  private subscribeToEvents() {

    this.isLoading = true;
    this.userService.getAllUsers()
      .subscribe( ( data: User) => {
        this.isLoading = false;
        this.users = data;
        console.log('---> ', this.users);
      }, err => {
        this.isLoading = false;
        throw err;
      });
  }

}
