import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent {
  selectedDateOption: string = '1'; // Default date option
  specificDate: string = '';
  lastNDays: number = 7;
  startDate: string = '';
  endDate: string = '';
  stockData: any[] = [];
  filteredData: any[] = [];
  staticColumns = ['Filter','SYMBOL', 'SERIES', 'OPEN', 'HIGH', 'LOW', 'CLOSE', 'LAST', 'PREVCLOSE', 'TOTTRDQTY', 'TOTTRDVAL', 'TIMESTAMP', 'TOTALTRADES', 'ISIN'];
  filterText: string = '';
  isLoading: boolean = false; // Added loading indicator

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

  getStocksData() {
    let apiUrl = 'http://127.0.0.1:5000/get_stocks_data';
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
          this.stockData = data;
          this.filteredData = data; // Initialize filteredData with all data
        } else {
          this.stockData = [];
          this.filteredData = [];
        }
      });
  }

    

  applyFilter() {
    if (!this.filterText) {
      this.filteredData = this.stockData; // No filter, show all data
      return;
    }

    // Filter the data based on the filter text
    const filterLower = this.filterText.toLowerCase();
    this.filteredData = this.stockData.filter(item => {
      return item['SYMBOL'].toLowerCase().includes(filterLower);
    });
  }
}
