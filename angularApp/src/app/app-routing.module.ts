import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowComponent } from './show/show.component';
import { NewComponent } from './new/new.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
	{ path: '',
	  redirectTo: '/show',
	  pathMatch: 'full'
	 },
	{ path: 'show', component: ShowComponent },
	{ path: 'new', component: NewComponent },
	{ path: 'details/:id', component: DetailsComponent },
	{ path: 'edit/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
