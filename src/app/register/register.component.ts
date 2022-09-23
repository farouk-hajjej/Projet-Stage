import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('username') nameKey!: ElementRef;

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        window.location.href = '../home';
        this.isSignUpFailed = false;
        localStorage.setItem('username', this.nameKey.nativeElement.value);

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);

  }
}
