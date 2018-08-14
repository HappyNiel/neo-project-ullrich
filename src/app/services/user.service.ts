import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()

export class UserService {

	constructor(private http: HttpClient) {}

	getUser(id) {
		return this.http.get(`/api/user/${id}`)
	}
}
