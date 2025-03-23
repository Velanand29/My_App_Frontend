import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.css']
})
export class FullComponent {
  selectedDateOption: string = '1';
  specificDate: string = '';
  lastNDays: number = 7;
  startDate: string = '';
  endDate: string = '';
  fullData: any[] = [];
  filterText: string = ''; // Add a filter text variable
  isLoading: boolean = false; // Added loading indicator

  constructor(private http: HttpClient) {}

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

  applyFilter() {
    this.fullData = this.fullData.filter((item) => {
      // Customize the filtering logic based on your requirements
      return item['SYMBOL'].toLowerCase().includes(this.filterText.toLowerCase());
    });
  }

  getFullData() {
    let apiUrl = 'http://127.0.0.1:5000/get_full_data';

    // Build the request parameters based on selectedDateOption and date inputs
    let params = new HttpParams().set('data_option', this.selectedDateOption);

    if (this.selectedDateOption === '2') {
      params = params.set('specific_date', this.specificDate);
    } else if (this.selectedDateOption === '3') {
      params = params.set('num_days', this.lastNDays.toString());
    } else if (this.selectedDateOption === '4' || this.selectedDateOption === '5') {
      params = params.set('start_date', this.startDate);
      params = params.set('end_date', this.endDate);
    }

    

    this.isLoading = true; // Set loading to true before making the request

    // Make an HTTP request to the API
    this.http.get(apiUrl, { params }).subscribe(
      (response: any) => {
        this.fullData = response;
        this.isLoading = false; // Set loading to false after receiving data
      },
      (error) => {
        console.error('Error fetching Full data:', error);
        this.fullData = [];
        this.isLoading = false; // Set loading to false in case of an error
      }
    );
  }
}
