import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fno',
  templateUrl: './fno.component.html',
  styleUrls: ['./fno.component.css']
})
export class FNOComponent {
  selectedDateOption: string = '1'; // Default date option
  specificDate: string = '';
  lastNDays: number = 7;
  startDate: string = '';
  endDate: string = '';
  fnoData: any[] = [];
  filteredData: any[] = [];
  staticColumns = ['INSTRUMENT', 'SYMBOL', 'EXPIRY_DT', 'STRIKE_PR', 'OPTION_TYP', 'OPEN', 'HIGH', 'LOW', 'CLOSE', 'SETTLE_PR', 'CONTRACTS', 'VAL_INLAKH', 'OPEN_INT', 'CHG_IN_OI', 'TIMESTAMP'];
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

  getFNOData() {
    let apiUrl = 'http://127.0.0.1:5000/get_fno_data';
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

    this.http.get(`${apiUrl}?${queryParams}`)
      .subscribe((data: any) => {
        if (data && data.length > 0) {
          this.fnoData = data;
          this.filteredData = data; // Initialize filteredData with all data
        } else {
          this.fnoData = [];
          this.filteredData = [];
        }
      });
  }

  applyFilter() {
    if (!this.filterText) {
      this.filteredData = this.fnoData; // No filter, show all data
      return;
    }

    // Filter the data based on the filter text
    const filterLower = this.filterText.toLowerCase();
    this.filteredData = this.fnoData.filter(item => {
      return item['INSTRUMENT'].toLowerCase().includes(filterLower);
    });
  }
}
