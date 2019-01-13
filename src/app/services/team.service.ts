import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()

export class TeamService {

	constructor(private http: HttpClient) {}

	getTeams() {
		return this.http.get("/api/team");
	}

	createTeam(team) {
		return this.http.post("/api/team", team);
	}

	getTeam(id) {
		return this.http.get(`/api/team/${id}`)
	}

	getTeamEntries(id) {
		return this.http.get(`/api/team/${id}/entry`)
	}

	getTeamDrivers(id) {
		return this.http.get(`/api/team/${id}/drivers`)
	}

	addTeamDriver(id, driver) {
		driver.Team = [id];
		return this.http.post(`/api/team/${id}/drivers`, driver)
	}
}
