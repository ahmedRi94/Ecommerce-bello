import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  name: string = "";
  surname: string = "";
  email: string = "";
  address: string = "";
  country: string = "";
  city: string = "";
  cap: number = 0;
  password: string = "";
  Cpass: string = "";
  counterId: number;
  @ViewChild("errorStamp") error: ElementRef;

  constructor(private appService: AppService, private route: ActivatedRoute, private router: Router) {
    this.appService.getUsers().subscribe((res) => {
      this.counterId = res.length;
    })
  }

  ngOnInit(): void {

  }

  signUp() {
    if (this.name === "") {
      this.error.nativeElement.classList.add("error");
      this.error.nativeElement.innerHTML = "Campo nome obbligatorio";
    } else if (this.surname === "") {
      this.error.nativeElement.classList.add("error");
      this.error.nativeElement.innerHTML = "Campo cognome obbligatorio";
    } else if (this.email === "") {
      this.error.nativeElement.classList.add("error");
      this.error.nativeElement.innerHTML = "Campo email obbligatorio";
    } else if (this.address === "") {
      this.error.nativeElement.classList.add("error");
      this.error.nativeElement.innerHTML = "Campo indirizzo obbligatorio";
    } else if (this.country === "") {
      this.error.nativeElement.classList.add("error");
      this.error.nativeElement.innerHTML = "Campo paese obbligatorio";
    } else if (this.city === "") {
      this.error.nativeElement.classList.add("error");
      this.error.nativeElement.innerHTML = "Campo città obbligatorio";
    } else if (this.cap === 0) {
      this.error.nativeElement.classList.add("error");
      this.error.nativeElement.innerHTML = "Campo cap obbligatorio";
    } else if (this.password === "") {
      this.error.nativeElement.classList.add("error");
      this.error.nativeElement.innerHTML = "Campo password obbligatorio";
    } else if (this.Cpass === "") {
      this.error.nativeElement.classList.add("error");
      this.error.nativeElement.innerHTML = "Campo conferma password obbligatorio";
    } else if (this.password !== this.Cpass) {
      this.error.nativeElement.classList.add("error");
      this.error.nativeElement.innerHTML = "Le password devono essere uguali";
    } else {
      this.counterId++;
      let obj: User = {
        id: this.counterId,
        role: this.appService.userRole,
        name: this.name,
        surname: this.surname,
        email: this.email,
        address: this.address,
        country: this.country,
        city: this.city,
        cap: this.cap,
        password: this.password
      }
      try {
        this.appService.postUser(obj).subscribe((res) => {
          this.appService.changeUserRole('user'); 
          this.error.nativeElement.classList.add("error");
          this.error.nativeElement.innerHTML = "Grazie per esserti registrato!!! <br>Benvenuto " + this.name;
          this.error.nativeElement.style="background : green; height:9%";
          this.name = "";
          this.surname = "";
          this.email = "";
          this.address = "";
          this.country = "";
          this.city = "";
          this.cap = 0;
          this.password = "";
          this.Cpass = "";
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 5000);
        })
      } catch (error) {
        this.error.nativeElement.classList.add("error");
        this.error.nativeElement.innerHTML = "Errore tecnico!!! Si prega di riprovare più tardi.<br> Grazie" + this.name;
        this.error.nativeElement.style="height:9%";
        console.log(error);
        
      }
    }
  }

}
