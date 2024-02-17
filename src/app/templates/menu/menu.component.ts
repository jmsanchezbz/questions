import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css',
    standalone: true,
    imports: [RouterLink, NgIf]
})
export class MenuComponent {

  constructor(private userService: UserService) {}

  isAuthenticated():boolean { 
    return this.userService.isAuthenticated();
  }
  
  logout():void {
    console.log('Menu logout');
    this.userService.logOut();
  }
}
