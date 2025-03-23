import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkDealsComponent } from './bulk-deals.component';

describe('BulkDealsComponent', () => {
  let component: BulkDealsComponent;
  let fixture: ComponentFixture<BulkDealsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkDealsComponent]
    });
    fixture = TestBed.createComponent(BulkDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
