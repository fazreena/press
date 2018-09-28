import { DataApiProvider } from './../data-api/data-api';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DatePipe } from '@angular/common';

@Injectable()
export class ApiProvider {

  public static readonly server = 'https://tms.mentor-facilities.com.my/backend/';
  public static readonly mobileweb = 'https://tms.mentor-facilities.com.my/';
  mailgunUrl: string;
  mailgunApiKey: string;


  constructor(
    private http: Http,
    private datePipe: DatePipe,
    public dataApi: DataApiProvider
  ) {
  }


  public signin(username, password) {
    return new Promise((resolve, reject) => {

      this.http.get(ApiProvider.server + 'auth.json?username=' + username + '&password=' + password)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  public signup(staffNumber, email) {
    return new Promise((resolve, reject) => {

      this.http.get(ApiProvider.server + 'signup.json'
        + '?staff_no=' + staffNumber
        + '&NRIC=' + email)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  public check_user(NRIC) {
    return new Promise((resolve, reject) => {
      this.http.get(ApiProvider.server + 'check.json'
        + '?NRIC=' + NRIC)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  public get_info(staffNumber) {
    return new Promise((resolve, reject) => {
      this.http.get(ApiProvider.server + 'info.json'
        + '?staff_number=' + staffNumber)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  public submitTag(direction: number, lat: number, long: number, timestamp: string, reason: string, log: string, address: string, description: string) {
    return new Promise((resolve, reject) => {
      timestamp = this.datePipe.transform(timestamp, 'yyyy-MM-dd H:mm:ss');
      console.log('timestamp: ' + timestamp);

      this.http.get(ApiProvider.server + 'log.json?key=' + localStorage.getItem("token")
        + '&direction=' + direction
        + '&lat=' + lat + '&long='
        + long + '&user_id='
        + localStorage.getItem("user_id")
        + '&tag_date=' + timestamp
        + '&reason=' + reason
        + '&log=' + log
        + '&address=' + address
        + '&description=' + description
      )
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  public get_submission_history(limit) {
    return new Promise((resolve, reject) => {

      this.http.get(ApiProvider.server + 'activity.json?key=' + localStorage.getItem("token") + '&limit=' + limit)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  public get_latest() {
    return new Promise((resolve, reject) => {

      this.http.get(ApiProvider.server + 'last.json?user_id=' + localStorage.getItem("user_id"))
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  public get_staffs_history(limit) {
    return new Promise((resolve, reject) => {

      this.http.get(ApiProvider.server + 'activities.json?limit=' + limit)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  public get_reasons() {
    return new Promise((resolve, reject) => {

      this.http.get(ApiProvider.server + 'reasons.json')
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  public get_downloads(query) {
    return new Promise((resolve, reject) => {
      let body = JSON.stringify(query);
      this.http.post(ApiProvider.server + 'summary.json', body)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  public get_report(query) {
    return new Promise((resolve, reject) => {
      let body = JSON.stringify(query);
      this.http.post(ApiProvider.server + 'report.json', body)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  public update_info(query) {
    return new Promise((resolve, reject) => {
      this.http.get(ApiProvider.server + 'update_info.json?' + query)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
}
