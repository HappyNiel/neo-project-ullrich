import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service'

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  public teams;

  constructor(private _teamService: TeamService) { }

  ngOnInit() {
    this.teams = [];
    this.getTeams();
  }

  getTeams()  {
    this._teamService.getTeams().subscribe(
      data => { this.teams = data },
      err => { console.error(err) }
    );
  }
}
