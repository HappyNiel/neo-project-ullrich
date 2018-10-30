import { Component, OnInit }	from "@angular/core";
import { UserService } 			from "../services/user.service";
import { 
	NgForm, 
	FormGroup, 
	FormControl }
from "@angular/forms";

@Component({
	selector: "app-users",
	templateUrl: "./users.component.html",
	styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
	public userForm: FormGroup;

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

	public testInfo: Object = {
		"FirstName": "Niel",
		"LastName": "Hekkens",
		"Email": "nielhekkens@gmail.com",
		"DiscordUsername": "NielHekkens",
		"DiscordDescriminator": "",
		"Address": "",
		"Zipcode": "",
		"State": "",
		"City": "Eindhoven",
		"Country": "The Netherlands"
	};

	constructor(private userService: UserService) { }

	ngOnInit() {
		this.getUserId();
		this.initiateForm(this.testInfo);
	}

	private initiateForm(userData): void {
		this.userForm = new FormGroup({
			"firstname": new FormControl(userData.FirstName),
			"lastname": new FormControl(userData.LastName),
			"email": new FormControl(userData.Email),
			"discord": new FormControl(userData.DiscordUsername),
			"address": new FormControl(userData.Address),
			"zipcode": new FormControl(userData.Zipcode),
			"state": new FormControl(userData.State),
			"city": new FormControl(userData.City),
			"country": new FormControl(userData.Country)
		});
	}

	private getUserId() {
		this.userService.getUserId().subscribe(discordData => {
			this._userRecordId = discordData["airtableId"];
			this.getUserInfo(this._userRecordId);
		});
	}

	public getUserInfo(id: string) {
		this.userService.getUserInfo(id).subscribe(dataObject => {
			this.preFillObjectDiscordUsername(dataObject["fields"]);
		});
	}

	public preFillObjectDiscordUsername(data) {
		this.userInfo["DiscordUsername"] = data.DiscordUsername;
	}

	public onSubmitForm(form: NgForm): void {
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
