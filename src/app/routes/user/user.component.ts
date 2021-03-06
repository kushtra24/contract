import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {UserService} from '../../services/user/user.service';
import {User} from '../../interfaces/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  isLoading: boolean;
  // loading spinner
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  user: User;

  constructor(private userService: UserService) {
    this.reset();
  }

  ngOnInit(): void {
    this.subscribeToEvents();
  }

  /**
   * reset
   */
  private reset() {

  }


  private subscribeToEvents() {

    this.isLoading = true;
    this.userService.getUser()
      .subscribe( (data: User) => {
        this.isLoading = false;
        this.user = data;
        console.log('userdata => ', this.user);
        }, err => {
        this.isLoading = false;
        throw err;
      });
      }

}
