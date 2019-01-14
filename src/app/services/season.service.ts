import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SeasonService {

  constructor(private http: HttpClient) { }

  getSeasons() {
		return this.http.get("/api/season");
	}
}
