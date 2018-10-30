import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {

	constructor(private http: HttpClient) {}

	public getUserId() {
		return this.http.get("/api/auth/info");
	}

	public getUserInfo(id: string) {
		return this.http.get(`api/user/${id}`);
	}
}
