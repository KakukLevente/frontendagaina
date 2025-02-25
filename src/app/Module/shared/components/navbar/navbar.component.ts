import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, } from '@angular/material/dialog';
import { AuthComponent } from '../../../auth/auth.component';
import { UserService } from '../../../../State/User/user.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../Models/AppState';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  currentSection: any
  isNavbarContentOpen: any
  userProfile: any

  constructor(private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private store: Store<AppState>) {

  }

  

  openNavbarContent(section: any) {
    this.isNavbarContentOpen = true;
    this.currentSection = section;

  }
  closeNavbarContent() {
    this.isNavbarContentOpen = false;
  }
  navigateTo(path: any) {

    this.router.navigate([path])

  }

  ngOnInit() {
    if (localStorage.getItem("jwt")) this.userService.getUserProfile()

    this.store.pipe(select((store) => store.user)).subscribe((user) => {
      this.userProfile = user.userProfile;
      if(user.userProfile){
        this.dialog.closeAll()
      }
      console.log("user",user)
    })
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const modelContainer = document.querySelector(".model-container");
    const openButtons = document.querySelectorAll(".open-button");

    let clickInsideButton = false;

    openButtons.forEach((button: Element) => {
      if (button.contains(event.target as Node)) {
        clickInsideButton = true
      }
    })

    if (modelContainer && !clickInsideButton && this.isNavbarContentOpen) {
      this.closeNavbarContent();
    }

  }

  handleOpenLoginModel = () => {
    console.log("handle open login model")
    this.dialog.open(AuthComponent, {
      width: "400px",
      disableClose: false
    })
  }

  handleLogout=()=>{
    this.userService.logout()
  }

  
}




