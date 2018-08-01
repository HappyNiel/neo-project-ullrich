import { Component, OnInit, ViewChild }	from "@angular/core";
import { UserService } 			from "../services/user.service";
import { NgForm } 				from "@angular/forms";

@Component({
	selector: "app-users",
	templateUrl: "./users.component.html",
	styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
	@ViewChild("userForm") userForm: NgForm;
	private _userRecordId: string;
	public userInfo: Object = {
		"FirstName": "",
		"LastName": "",
		"Email": "",
		"DiscordUsername": "",
		"DiscordDescriminator": "",
		"Address": "",
		"Zipcode": "",
		"State": "",
		"City": "",
		"Country": ""
	};

	constructor(private userService: UserService) { }

	ngOnInit() {
		this.getUserId();
		this.getUserInfo(this._userRecordId);
		console.log(this.userInfo);
	}

	private getUserId() {
		this.userService.getUserId().subscribe(discordData => {
			this._userRecordId = discordData["airtableId"];
		},
		err => { 
			console.error(err); 
		});
	}

	public getUserInfo(id: string) {
		this.userService.getUserInfo(id).subscribe(dataObject => {
			this.preFillDiscordUsername(dataObject);
		},
		err => { 
			console.error(err); 
		});
	}

	public preFillDiscordUsername(data) {
		this.userInfo["DiscordUsername"] = data["DiscordUsername"];
	}

	public handleForm(form: NgForm): void {
		this.saveFormInObject();
		// this.userService.updateUserInfo(this.userForm);
	}

	public saveFormInObject(): void {
		this.userInfo["FirstName"] = this.userForm.value.firstname;
		this.userInfo["LastName"] = this.userForm.value.lastname;
		this.userInfo["Email"] = this.userForm.value.email;
		this.userInfo["DiscordUsername"] = this.userForm.value.discord;
		this.userInfo["Address"] = this.userForm.value.address;
		this.userInfo["Zipcode"] = this.userForm.value.zipcode;
		this.userInfo["State"] = this.userForm.value.state;
		this.userInfo["City"] = this.userForm.value.city;
		this.userInfo["Country"] = this.userForm.value.country;
	}

	public clearForm(): void {
		this.userForm.reset();
	}
}
