import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private service: UserService) {
    
  }

  ngOnInit() {
  }
  
  get users(){
    return this.service.getUsers();
  }

  deleteUser(id: number){
    if(id == 1){
      this.service.showError('This user can not be deleted','Error');
    } else {
      this.service.deleteUser(id);
    }
  }
}
