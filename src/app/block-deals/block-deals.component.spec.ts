import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockDealsComponent } from './block-deals.component';

describe('BlockDealsComponent', () => {
  let component: BlockDealsComponent;
  let fixture: ComponentFixture<BlockDealsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockDealsComponent]
    });
    fixture = TestBed.createComponent(BlockDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
