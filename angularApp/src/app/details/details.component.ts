import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
	pets: any;
	thePet: any;
	petID: any;

  constructor(
	  private _httpService: HttpService,
	  private _router: Router,
	  private _route: ActivatedRoute
	) { }

  ngOnInit() {
	this._route.params.subscribe((params: Params) => {
		console.log(params['id']);
		this.getAPet(params['id']);
		this.petID = params['id'];
	})
  }

  getAPet(id) {
	  let observable = this._httpService.getOnePetID(id);
	  observable.subscribe( data => {
		this.thePet = data['data'];
		console.log('This is from getAPet in details component', this.thePet);
	  })
  }

  onDeleteButtonClick(id) {
	let observable = this._httpService.deletePet(id);
	observable.subscribe(data => {
		if(data["error"]) {
			console.log(data["error"]);
		} else {
			console.log("Deleted a pet", data);
			this._router.navigate(['/show']);
		}
	});
	}

  onLikeButtonClick(id) {
	  let observable = this._httpService.editPetLike(this.petID, this.thePet)
  }

}
