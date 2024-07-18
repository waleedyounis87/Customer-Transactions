import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  {
    path:'chart/:id',component:ChartComponent
  },
  {
    path:'customer',component:CustomersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
