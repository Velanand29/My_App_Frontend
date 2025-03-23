import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { StocksComponent } from './stocks/stocks.component';
import { FNOComponent } from './fno/fno.component';
import { FullComponent } from './full/full.component';
import { RangeCalcComponent } from './range-calc/range-calc.component';
import { CSVCombinerComponent } from './csv-combiner/csv-combiner.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'index', component: IndexComponent },
  { path: 'stocks', component: StocksComponent },
  { path: 'fno', component: FNOComponent },
  { path: 'full', component: FullComponent },
  { path: 'range-calc', component: RangeCalcComponent }, 
  { path: 'csv-combiner', component: CSVCombinerComponent }, 
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
