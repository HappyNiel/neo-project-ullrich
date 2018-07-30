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
	public userInfo = {
		"FirstName": "",
		"LastName": "",
		"Email": "",
		"DiscordUsername": "",
		"Address": "",
		"Zipcode": "",
		"State": "",
		"City": "",
		"Country": "",
	};

	constructor(private userService: UserService) { }

	ngOnInit() {
		// TODO: OnInit fetch the data from the user and pre-fill the information that is available.
	}

	public handleForm(form: NgForm): void {
		this.saveFormInObject();
		// this.userService.updateUserInfo(this.userForm);
	}

	public saveFormInObject(): void {
		this.userInfo.FirstName = this.userForm.value.firstname;
		this.userInfo.LastName = this.userForm.value.lastname;
		this.userInfo.Email = this.userForm.value.email;
		this.userInfo.DiscordUsername = this.userForm.value.discord;
		this.userInfo.Address = this.userForm.value.address;
		this.userInfo.Zipcode = this.userForm.value.zipcode;
		this.userInfo.State = this.userForm.value.state;
		this.userInfo.City = this.userForm.value.city;
		this.userInfo.Country = this.userForm.value.country;
	}

	public clearForm(): void {
		this.userForm.reset();
	}

}
