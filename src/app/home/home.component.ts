import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  storeIp: string;

  serverIpForm: FormGroup;
      constructor(private fb: FormBuilder) {
        this.storeIp = localStorage.getItem('serverip');
      }

      ngOnInit(): void {
        const ipPattern = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
        this.serverIpForm = this.fb.group({
          serverIp: [this.storeIp, Validators.pattern(ipPattern)]
        });
      }
  getIpAddress() {
    if(this.serverIpForm.valid){
      localStorage.setItem('serverip', this.serverIpForm.get('serverIp').value);
    }
  }
}

