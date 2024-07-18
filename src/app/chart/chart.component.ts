import { Component, Input, OnChanges, OnInit } from '@angular/core';

import Chart from 'chart.js/auto';
import { SharedDataService } from '../shared-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent  {
  
  constructor(private _SharedDataService:SharedDataService, private _ActivatedRoute:ActivatedRoute){}
  customers: any[] = [];
  customerAmount: string[] = [];
  customersDates: string[] = [];
  transactions: any[] = [];
  customerId:string | null = ''
  public chart: any;
  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.customersDates, 
	       datasets: [
          {
            label: "Amounts",
            data: this.customerAmount,
            backgroundColor: 'blue'
          },
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.customerId = params.get('id');
      console.log(this.customerId);
    });
    this._SharedDataService.getCustomers().subscribe(data => {
      this.customers = data;
    });

    this._SharedDataService.getTransactions().subscribe(data => {
      this.transactions = data;
      for(let c of this.transactions){
       if(c.id === this.customerId){
        this.customersDates.push(c.date);
        this.customerAmount.push(c.amount);
        console.log(this.customerAmount + "" + this.customersDates);
        this.createChart();
       }
      }
    });
  }
}