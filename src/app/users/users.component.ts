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

	constructor(private userService: UserService) { }

	ngOnInit() {
		
	}

	public updateUserInfo(form: NgForm): void {

	}

	public clearForm() {
		this.userForm.reset();
	}

}
