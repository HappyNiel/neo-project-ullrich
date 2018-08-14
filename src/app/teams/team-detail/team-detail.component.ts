import { Component, OnInit } from '@angular/core';
import { TeamService } from "../../services/team.service";
import {ActivatedRoute} from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {
  public team;
  public manager;

  constructor(private teamService: TeamService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const teamId = this.activatedRoute.snapshot.paramMap.get('team_id');
    this.team = {};
    this.manager = {};
		this.teamService.getTeam(teamId).subscribe(
			data => { console.log("got data"); this.team = data; this.getManager(); },
			err => { console.error(err); }
    );
  }

  getManager(){
    console.log("Get manager")
    console.log(this.team);
    let managerId = this.team.fields.Manager[0];
    console.log(managerId);
    if(managerId){
      this.userService.getUser(managerId).subscribe(
        data => { console.log(data); this.manager = data; },
        err => { console.error(err); }
      );
    }
  }

}
