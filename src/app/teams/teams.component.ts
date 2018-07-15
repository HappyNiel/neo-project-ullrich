import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service'

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  public teams;
  public newTeam: Object = {};

  constructor(private _teamService: TeamService) { }

  ngOnInit() {
    this.teams = [];
    this.newTeam = {};
    this.getTeams();
  }

  getTeams()  {
    this._teamService.getTeams().subscribe(
      data => { this.teams = data },
      err => { console.error(err) }
    );
  }

  createTeam(){
    this._teamService.createTeam(this.newTeam).subscribe(
      data => { this.newTeam = {}; this.getTeams(); },
      err => { console.error(err) }
    );
  }
}
