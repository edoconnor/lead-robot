import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  NgForm,
} from '@angular/forms';
import { EmailService } from '../services/email.service';
import { SmsService } from '../services/sms.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  FormData!: FormGroup;

  isSubmitted = false;

  constructor(
    private builder: FormBuilder,
    private contact: EmailService,
    private userService: UserService,
    private smsService: SmsService
  ) {}

  ngOnInit() {
    this.FormData = this.builder.group({
      Fullname: new FormControl('', Validators.required),
      Email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      Phone: new FormControl('', Validators.required),
      Comment: new FormControl('', Validators.required),
      sms: new FormControl(false),
    });
  }

  onSubmit() {
    this.contact.PostMessage(this.FormData.value).subscribe(
      (response) => {
        this.isSubmitted = true;
        const user: User = {
          name: this.FormData.value.Fullname,
          email: this.FormData.value.Email,
          phone: this.FormData.value.Phone,
          sms: this.FormData.value.sms,
        };
        this.userService.saveUser(user).subscribe();

        if (this.FormData.value.sms) {
          this.sendConfirmationText(user.phone!);
        }
      },
      (error) => console.log({ error })
    );
  }

  sendConfirmationText(phone: string) {
    const message = 'Thanks for contacting Lead Robot. I\'ll be in touch soon. ~ Eddie 🤖';
    this.smsService.sendSms(phone, message).subscribe(
      (response) => console.log('SMS sent successfully', response),
      (error) => console.log('Error sending SMS', error)
    );
  }
}