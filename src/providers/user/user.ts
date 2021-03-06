import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { HttpClientWrapperService } from '../api/http-wrapper.service';
import { HttpResponse } from '@angular/common/http';
import {MainPage} from '../../pages';
import {NavController} from 'ionic-angular';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;

  constructor(public api: Api, public httpwrapper: HttpClientWrapperService) {
    let user = localStorage.getItem('user');
    if (user) {
      this._user = JSON.parse(user);
    }
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.httpwrapper.post(accountInfo, 'Users/LoginUser').share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res) {
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.httpwrapper.post(accountInfo, '/Users/CreateUser').share();

    seq.subscribe((res: any) => {
      if (res.status == 'success') {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
    localStorage.clear();
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp;
    localStorage.setItem('user', JSON.stringify(this._user));
  }

  userIsLoggedIn(): boolean {
    return this._user;
  }
}
