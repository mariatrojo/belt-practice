import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newPet: any;

  constructor(
	  private _httpService: HttpService,
	  private _router: Router
	) { }

  ngOnInit() {
	  this.newPet = { name: "", type: "", desc: "", skill1: "", skill2: "", skill3: "" }
}

  onSubmit(){
	  let observable = this._httpService.addPet(this.newPet);
	  observable.subscribe(data => {
		  if(data["error"]) {
			  console.log(data["error"]);
		  } else {
			this.newPet = { name: "", type: "", desc: "", skill1: "", skill2: "", skill3: "" }
			console.log("Got a new pet", data);
			this._router.navigate(['/show']);
		  }
	  })
  }


}
