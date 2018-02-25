import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	thePet = {name: ""};
	petID: any;

  constructor(
	private _httpService: HttpService, 
	private _router: Router, 
	private _route: ActivatedRoute
  ) { }

  ngOnInit() {
	this._route.params.subscribe((params: Params) => {
		console.log(params['id']);
		this.getThePet(params['id']);
		this.petID = params['id'];
	})
  }

  getThePet(ID) {
	let observable = this._httpService.getOnePetID(ID);
	observable.subscribe(data => {
		this.thePet = data['data'];
		console.log('Hi this is from getTheAuthor', this.thePet);
	})
	}

	onEditSubmit(){
		console.log(this.petID);
		this._httpService.editPet(this._httpService.petID, this.thePet).subscribe(data => {
			if(data["error"]){
				console.log("There's a problem in edit component", data["error"]);
			} else {
				console.log(data['db']);
				//Update fix: works once we add the Router module to redirect
				this._router.navigate(['/show']);
			}
		})
	}

}
