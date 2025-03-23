// index.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  selectedDateOption: string = '1'; // Default date option
  specificDate: string = '';
  lastNDays: number = 7;
  startDate: string = '';
  endDate: string = '';
  indexData: any[] = [];
  filteredData: any[] = []; // Added filtered data array
  isLoading: boolean = false; // Added loading indicator
  staticColumns = [
    'Index Name', 'Index Date', 'Open Index Value', 'High Index Value', 'Low Index Value',
    'Closing Index Value', 'Points Change', 'Change (%)', 'Volume', 'Turnover (Rs. Cr.)',
    'P/E', 'P/B', 'Div Yield'
  ];
  filterText: string = '';

  constructor(private http: HttpClient) { }

  onDateOptionChange() {
    if (this.selectedDateOption === '1' || this.selectedDateOption === '6') {
      this.specificDate = '';
      this.lastNDays = 7;
      this.startDate = '';
      this.endDate = '';
    }
  }

  onSpecificDateChange() {
    if (this.specificDate) {
      this.lastNDays = 7;
      this.startDate = '';
      this.endDate = '';
    }
  }

  onLastNDaysChange() {
    if (this.lastNDays) {
      this.specificDate = '';
      this.startDate = '';
      this.endDate = '';
    }
  }

  getIndexData() {
    let apiUrl = 'http://127.0.0.1:5000/get_index_data';
    let queryParams = `data_option=${this.selectedDateOption}`;

    if (this.selectedDateOption === '2' && this.specificDate) {
      queryParams += `&specific_date=${this.specificDate}`;
    } else if (this.selectedDateOption === '3') {
      queryParams += `&data_option=3&num_days=${this.lastNDays}`;
    } else if (this.selectedDateOption === '4' && this.startDate && this.endDate) {
      queryParams += `&start_date=${this.startDate}&end_date=${this.endDate}`;
    } else if (this.selectedDateOption === '5' && this.startDate && this.endDate) {
      queryParams += `&start_date=${this.startDate}&end_date=${this.endDate}`;
    }

    this.isLoading = true; // Set loading to true before making the request

    this.http.get(`${apiUrl}?${queryParams}`)
      .subscribe((data: any) => {
        if (data && data.length > 0) {
          this.indexData = data;
          this.filteredData = data; // Initialize filteredData with all data
        } else {
          this.indexData = [];
          this.filteredData = [];
        }
        this.isLoading = false; // Set loading to false after data is loaded
      });
  }

  applyFilter(filterText: string) {
    this.filteredData = this.indexData.filter(item => {
      return item['Index Name'].toLowerCase().includes(filterText.toLowerCase());
    });
  }
}
