import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-teams',
	templateUrl: './teams.component.html',
	styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
	public teams;

	newTeam: FormGroup;


	constructor(private _teamService: TeamService, private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.teams = [];
		this.createForm();
		this.getTeams();
	}

	getTeams() {
		this._teamService.getTeams().subscribe(
			data => { this.teams = data; },
			err => { console.error(err); }
		);
	}

	createTeam() {
		this._teamService.createTeam(this.buildSaveObject()).subscribe(
			data => { this.newTeam.reset(); this.getTeams(); },
			err => { console.error(err); }
		);
	}

	buildSaveObject() {
		const formModel = this.newTeam.value;

		return {
			Name: formModel.Name as String,
			Nationality: formModel.Nationality as String,
			Website: formModel.Website as String,
			Twitter: formModel.Twitter as String
		};
	}

	createForm() {
		this.newTeam = this.formBuilder.group({
			Name: ['', Validators.required],
			Nationality: '',
			Website: '',
			Twitter: ''
		});
	}
}
