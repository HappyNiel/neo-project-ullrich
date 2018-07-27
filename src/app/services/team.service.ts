import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class TeamService {

	constructor(private http: HttpClient) {}

	getTeams() {
		return this.http.get('/api/team');
	}

	createTeam(team) {
		return this.http.post('/api/team', team);
	}
}
