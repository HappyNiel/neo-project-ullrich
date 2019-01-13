import { Component, OnInit, ViewChild } from "@angular/core";
import { TeamService } from "../../../services/team.service";
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.scss']
})
export class CreateEntryComponent implements OnInit {
  @ViewChild("newEntryForm") newEntryForm: NgForm;
  public newEntry = {
		"Name": "",
		"Class": "",
		"Car": "",
		"Number": ""
  };

  public team;

  
  private _teamId: String;

  constructor(private _teamService: TeamService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._teamId = this._route.snapshot.paramMap.get('team_id');
    this._route.paramMap.subscribe((params: ParamMap) =>  {
        this._teamId = params.get('team_id');
    });

    this.team = {
      "fields": {
        "Name": ""
      }
    };
    this.getTeam();
  }

  createEntry(formData: NgForm) {
		this.newEntry.Name = this.newEntryForm.value.name;
		this.newEntry.Class = this.newEntryForm.value.class;
		this.newEntry.Car = this.newEntryForm.value.car;
		this.newEntry.Number = this.newEntryForm.value.number;

		this._teamService.createEntry(this._teamId, this.newEntry).subscribe(
			data => { this.newEntryForm.reset(); },
			err => { console.error(err); }
		);
	}

	clearForm() {
		this.newEntryForm.reset();
  }
  
  getTeam(){
    this._teamService.getTeam(this._teamId).subscribe(
			data => { this.team = data; },
			err => { console.error(err); }
		);
  }

}
