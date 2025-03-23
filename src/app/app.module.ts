import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StocksComponent } from './stocks/stocks.component';
import { IndexComponent } from './index/index.component';
import { FNOComponent } from './fno/fno.component';
import { FullComponent } from './full/full.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RangeCalcComponent } from './range-calc/range-calc.component';
import { BulkDealsComponent } from './bulk-deals/bulk-deals.component';
import { BlockDealsComponent } from './block-deals/block-deals.component';
import { FilterPipe } from './filter.pipe';
import { CSVCombinerComponent } from './csv-combiner/csv-combiner.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StocksComponent,
    IndexComponent,
    FNOComponent,
    FullComponent,
    RangeCalcComponent
    ,RangeCalcComponent, BulkDealsComponent, BlockDealsComponent,FilterPipe, CSVCombinerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BsDatepickerModule.forRoot() // Include it in the imports array
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
