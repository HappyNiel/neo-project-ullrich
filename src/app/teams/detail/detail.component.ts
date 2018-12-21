import { Component, OnInit } from '@angular/core';
import { TeamService } from "../../services/team.service";
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-team-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  public team;
  public entries;
  public drivers;

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

}
