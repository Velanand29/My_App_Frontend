import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-range-calc',
  templateUrl: './range-calc.component.html',
  styleUrls: ['./range-calc.component.css']
})
export class RangeCalcComponent {
  selectedInstrument: string = '';
  symbols: string[] = [];
  selectedSymbol: string = '';
  selectedDateOption: string = '1';
  specificDate: string = '';
  lastNDays: number = 7;
  startDate: string = '';
  endDate: string = '';
  expiryDate: string = '';
  optionType: string = '';
  open: string = '';
  high: string = '';
  low: string = '';
  close: string = '';
  settlePr: string = '';
  contracts: string = '';
  valInLakh: string = '';
  openInt: string = '';
  chgInOi: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient) { }

  onInstrumentChange() {
    const apiUrl = `http://127.0.0.1:5000/get_fno_list?instrument=${this.selectedInstrument}`;

    this.http.get(apiUrl).subscribe((data: any) => {
      this.symbols = data;
    });
  }

  onSymbolChange() {
    // Reset fields on symbol change
    this.expiryDate = '0';
    this.optionType = 'XX';
    this.open = '';
    this.high = '';
    this.low = '';
    this.close = '';
    this.settlePr = '';
    this.contracts = '';
    this.valInLakh = '';
    this.openInt = '';
    this.chgInOi = '';
    this.getData(); // Fetch data for the new symbol
  }

  onDateOptionChange() {
    // Reset fields based on the selected date option
    this.specificDate = '';
    this.lastNDays = 7;
    this.startDate = '';
    this.endDate = '';
    if (this.selectedDateOption === '2') {
      // Set specific date to today when selecting 'Specific Date'
      this.specificDate = new Date().toISOString().split('T')[0];
    }
  }

  onSpecificDateChange() {
    this.lastNDays = 7;
    this.startDate = '';
    this.endDate = '';
  }

  onLastNDaysChange() {
    this.specificDate = '';
    this.startDate = '';
    this.endDate = '';
  }

  getData() {
    let apiUrl = '';

    if (this.selectedDateOption === '2') {
      // Specific date
      apiUrl = `http://127.0.0.1:5000/get_fno_data?data_option=${this.selectedDateOption}&symbol=${this.selectedSymbol}&specific_date=${this.specificDate}`;
    } else if (this.selectedDateOption === '3') {
      // Last N days
      apiUrl = `http://127.0.0.1:5000/get_fno_data?data_option=${this.selectedDateOption}&symbol=${this.selectedSymbol}&num_days=${this.lastNDays}`;
    } else if (this.selectedDateOption === '4' || this.selectedDateOption === '5') {
      // Date Range or Custom Date Range
      apiUrl = `http://127.0.0.1:5000/get_fno_data?data_option=${this.selectedDateOption}&symbol=${this.selectedSymbol}&start_date=${this.startDate}&end_date=${this.endDate}`;
    } else if (this.selectedDateOption === '6') {
      // Yesterday
      apiUrl = `http://127.0.0.1:5000/get_fno_data?data_option=${this.selectedDateOption}&symbol=${this.selectedSymbol}`;
    }

    this.isLoading = true;

    this.http.get(apiUrl).subscribe((data: any) => {
      if (data.length > 0) {
        this.expiryDate = data[0].EXPIRY_DT || '0';

        if (this.selectedInstrument === 'OPTSTK' || this.selectedInstrument === 'OPTIDX') {
          // If instrument is OPTSTK or OPTIDX, determine OPTION_TYP
          const matchingOption = data.find((item: any) => item.OPTION_TYP === 'CE' || item.OPTION_TYP === 'PE');
          this.optionType = matchingOption ? matchingOption.OPTION_TYP : 'XX';
        } else {
          this.optionType = 'XX';
        }

        // Display other data columns
        this.open = data[0].OPEN || '';
        this.high = data[0].HIGH || '';
        this.low = data[0].LOW || '';
        this.close = data[0].CLOSE || '';
        this.settlePr = data[0].SETTLE_PR || '';
        this.contracts = data[0].CONTRACTS || '';
        this.valInLakh = data[0].VAL_INLAKH || '';
        this.openInt = data[0].OPEN_INT || '';
        this.chgInOi = data[0].CHG_IN_OI || '';
      } else {
        // No data available
        this.expiryDate = '0';
        this.optionType = 'XX';
        this.open = '';
        this.high = '';
        this.low = '';
        this.close = '';
        this.settlePr = '';
        this.contracts = '';
        this.valInLakh = '';
        this.openInt = '';
        this.chgInOi = '';
      }

      this.isLoading = false;
    });
  }
}
