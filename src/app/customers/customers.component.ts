import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent  implements OnInit {
  customers: any[] = [];
  transactions: any[] = [];
  filteredCustomers: any[] = [];
  filterCriteria: string = '';

  @Output() selectCustomer = new EventEmitter<number>();

  constructor(private dataService: SharedDataService) {}

  ngOnInit(): void {
    this.dataService.getCustomers().subscribe(data => {
      this.customers = data;
      this.filteredCustomers = data;
    });

    this.dataService.getTransactions().subscribe(data => {
      this.transactions = data;
    });
  }

  getTotalTransactionAmount(customerId: number): number {
    return this.transactions
      .filter(transaction => transaction.customer_id == customerId)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }

  filterTable(): void {
    this.filteredCustomers = this.customers.filter(customer => {
      const totalAmount = this.getTotalTransactionAmount(customer.id);
      return customer.name.toLowerCase().includes(this.filterCriteria.toLowerCase()) || totalAmount.toString().includes(this.filterCriteria);
    });
  }

  onSelectCustomer(customerId: number): void {
    this.selectCustomer.emit(customerId);
  }
}