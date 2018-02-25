import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
	pets: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
	  this.getPetsFromService();
  }

  getPetsFromService() {
	let observable = this._httpService.getPets();
	observable.subscribe(data => {
		console.log("Got our pets!", data)
		this.pets = data['pets'];
	})
  }

  saveIDtoService(petID){
    this._httpService.petID = petID
    console.log("ID got saved", petID)
  }

}
