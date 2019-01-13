import { Component, OnInit, ViewChild } from '@angular/core';
import { TeamService } from "../../services/team.service";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-team-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class TeamDetailComponent implements OnInit {
  @ViewChild("newDriverForm") newDriverForm: NgForm;
  public team;
  public entries;
  public drivers;

  public newDriver = {
    "FirstName": "",
    "LastName": "",
		"Nationality": "",
    "Email": "",
    "IracingID": 0,
    "Discord": "",
    "Team": ""
	};

  private _teamId: String;

  constructor(private _teamService: TeamService, private _route: ActivatedRoute) { }

  ngOnInit() {
    // For a static snapshot of the route...
    this._teamId = this._route.snapshot.paramMap.get('team_id');
    this._route.paramMap.subscribe((params: ParamMap) =>  {
        this._teamId = params.get('team_id');
    });

    this.team = {
      "fields": {
        "Name": ""
      }
    };

    this.entries = [];
    this.drivers = [];

    this.getTeam();
    this.getEntries();
    this.getDrivers();
  }

  getTeam(){
    this._teamService.getTeam(this._teamId).subscribe(
			data => { this.team = data; },
			err => { console.error(err); }
		);
  }

  getEntries(){
    this._teamService.getTeamEntries(this._teamId).subscribe(
			data => { this.entries = data; },
			err => { console.error(err); }
		);
  }

  getDrivers(){
    this._teamService.getTeamDrivers(this._teamId).subscribe(
			data => { this.drivers = data; },
			err => { console.error(err); }
		);
  }

  public clearNewDriverForm() {
		this.newDriverForm.reset();
  }
  
  public createDriver(formData: NgForm) {
    this.newDriver.FirstName = this.newDriverForm.value.firstName;
    this.newDriver.LastName = this.newDriverForm.value.lastName;
		this.newDriver.Nationality = this.newDriverForm.value.nationality;
		this.newDriver.Discord = this.newDriverForm.value.discord;
    this.newDriver.Email = this.newDriverForm.value.email;
    this.newDriver.IracingID = this.newDriverForm.value.iracingID

		this._teamService.addTeamDriver(this._teamId, this.newDriver).subscribe(
			data => { this.newDriverForm.reset(); this.getDrivers(); },
			err => { console.error(err); }
		);
	}
}
