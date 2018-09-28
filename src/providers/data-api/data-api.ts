import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DataApiProvider {

  public data = {
    debug: '',
    serverPath: '',
    token: '0',
    location: '',
    user_id: '',
    email:'',
    name:'',
    company:'',
    start_hour:'',
    start_week:'',
    day1_ot:'',
    day2_ot:'',
    day3_ot:'',
    day4_ot:'',
    day5_ot:'',
    photo: '',
    isCheckedIn: false,
    activate: false
  };

  constructor(public http: Http) {
    console.log('Hello Data Provider');
  }

  public store(key:string, value:any) {
    
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, value);
    } 
    this.get(key);
  }

  public update(key:string, value:any) {
    localStorage.setItem(key, value);
    this.get(key);
  }

  public clear(key:string) {
    localStorage.removeItem(key);
  }

  public flush() {
    localStorage.clear();
  }

  public get(key) {
    let temp = localStorage.getItem(key);
    if (key == 'email') {
      this.data.email = temp;
    } else if (key == 'serverPath') {
      this.data.serverPath = temp;
    } else if (key == 'token') {
      this.data.token = temp;
    } else if (key == 'user_id') {
      this.data.user_id = temp;
    } else if (key == 'location') {
      this.data.location = temp;
    } else if (key == 'debug') {
      this.data.location = temp;
    } else if (key == 'name') {
      this.data.name = temp;
    } else if (key == 'name') {
      this.data.name = temp;
    } else if (key == 'company') {
      this.data.company = temp;
    } else if (key == 'start_hour') {
      this.data.start_hour = temp;
    } else if (key == 'start_week') {
      this.data.start_week = temp;
    } else if (key == 'day1_ot') {
      this.data.day1_ot = temp;
    } else if (key == 'day2_ot') {
      this.data.day2_ot = temp;
    } else if (key == 'day3_ot') {
      this.data.day3_ot = temp;
    } else if (key == 'day4_ot') {
      this.data.day4_ot = temp;
    } else if (key == 'day5_ot') {
      this.data.day5_ot = temp;
    } else if (key == 'photo') {
      this.data.photo = temp;
    } else if (key == 'isCheckedIn') {
      this.data.isCheckedIn = (temp == "true");
    } else if (key == 'activate') {
      this.data.activate = (temp == "true");
    }
    return temp;
  }
  
}









//import { Injectable } from '@angular/core';

/*
  Generated class for the DataApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
//@Injectable()
//export class DataApiProvider {

  //constructor() {
    //console.log('Hello DataApiProvider Provider');
 // }

//}
