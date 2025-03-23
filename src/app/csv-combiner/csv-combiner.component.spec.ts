import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSVCombinerComponent } from './csv-combiner.component';

describe('CSVCombinerComponent', () => {
  let component: CSVCombinerComponent;
  let fixture: ComponentFixture<CSVCombinerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CSVCombinerComponent]
    });
    fixture = TestBed.createComponent(CSVCombinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
