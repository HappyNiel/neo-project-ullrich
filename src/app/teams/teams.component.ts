import { Component, OnInit, ViewChild } from "@angular/core";
import { TeamService } from "../services/team.service";
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from "@angular/forms";

@Component({
	selector: "app-teams",
	templateUrl: "./teams.component.html",
	styleUrls: ["./teams.component.scss"]
})
export class TeamsComponent implements OnInit {
	@ViewChild("newTeamForm") signupForm: NgForm;
	public teams;
	public newTeam = {
		"Name": "",
		"Nationality": "",
		"Website": "",
		"Twitter": ""
	};

	// newTeam: FormGroup;


	constructor(private _teamService: TeamService) { }

	ngOnInit() {
		this.teams = [];
		this.getTeams();
	}

	getTeams() {
		this._teamService.getTeams().subscribe(
			data => { this.teams = data; },
			err => { console.error(err); }
		);
	}

	public createTeam(formData: NgForm) {
		this.newTeam.Name = this.signupForm.value.name;
		this.newTeam.Nationality = this.signupForm.value.nationality;
		this.newTeam.Website = this.signupForm.value.website;
		this.newTeam.Twitter = this.signupForm.value.twitter;

		this._teamService.createTeam(this.newTeam).subscribe(
			data => { this.signupForm.reset(); this.getTeams(); },
			err => { console.error(err); }
		);
	}

	public clearForm() {
		this.signupForm.reset();
	}
}
