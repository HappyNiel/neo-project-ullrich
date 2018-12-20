import { Component, OnInit } from '@angular/core';
import { TeamService } from "../../services/team.service";

@Component({
  selector: 'app-team-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  public team;
  public entries;
  public drivers;

  constructor(private _teamService: TeamService) { }

  ngOnInit() {
    this.getTeam();
  }

  getTeam(){
    this._teamService.getTeams().subscribe(
			data => { this.team = data; },
			err => { console.error(err); }
		);
  }

}
