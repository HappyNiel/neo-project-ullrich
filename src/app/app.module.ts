import { BrowserModule }	from '@angular/platform-browser';
import { NgModule } 		from '@angular/core';


import { AppComponent } 					from './app.component';
import { HeaderComponent } 					from './header/header.component';
import { TeamsComponent } 					from './teams/teams.component';
import { EntriesComponent } 				from './entries/entries.component';
import { AdminComponent } 					from './admin/admin.component';
import { UsersComponent } 					from './users/users.component';
import { DriverRegistrationsComponent } 	from './driver-registrations/driver-registrations.component';
import { AppRoutingModule } 				from './routing/app-routing.module';
import { LoginComponent } 					from './login/login.component';


@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		TeamsComponent,
		EntriesComponent,
		AdminComponent,
		UsersComponent,
		DriverRegistrationsComponent,
		LoginComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
