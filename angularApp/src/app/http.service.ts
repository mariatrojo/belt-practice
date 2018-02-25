import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  petID: any;

  constructor(private _http: HttpClient) { }

  getPets(){
	  return this._http.get('/pets');
  }

  addPet(newpet) {
	  return this._http.post('/pets', newpet)
  }

  deletePet(id) {
	  return this._http.delete(`/pets/${id}`);
  }

  getOnePetID(id){
	  return this._http.get(`/pets/${id}`);
  }

  editPet(id, pet) {
	  console.log(id);
	  console.log(pet);
	  return this._http.put(`/pets/${id}`, pet);
  }

  editPetLike(id, pet) {
	  return this._http.put(`/likes/${id}`, pet);
  }

}
