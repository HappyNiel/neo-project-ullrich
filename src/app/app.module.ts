import { BrowserModule }	from "@angular/platform-browser";
import { NgModule } 		from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import {
	ReactiveFormsModule,
	FormsModule
} from "@angular/forms";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } 					from "./app.component";
import { HeaderComponent } 					from "./header/header.component";
import { TeamsComponent } 					from "./teams/teams.component";
import { EntriesComponent } 				from "./entries/entries.component";
import { AdminComponent } 					from "./admin/admin.component";
import { UsersComponent } 					from "./users/users.component";
import { DriverRegistrationsComponent } 	from "./driver-registrations/driver-registrations.component";
import { AppRoutingModule } 				from "./routing/app-routing.module";
import { LoginComponent } 					from "./login/login.component";
import { FooterComponent } 					from "./footer/footer.component";

// Sservices
import { TeamService }						from "./services/team.service";
import { TeamDetailComponent } from './teams/detail/detail.component';
import { CreateEntryComponent } from './teams/detail/create-entry/create-entry.component';


@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		TeamsComponent,
		EntriesComponent,
		AdminComponent,
		UsersComponent,
		DriverRegistrationsComponent,
		LoginComponent,
		FooterComponent,
		TeamDetailComponent,
		CreateEntryComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		NgbModule
	],
	providers: [
		TeamService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
