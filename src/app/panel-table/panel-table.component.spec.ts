import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTableComponent } from './panel-table.component';

describe('PanelTableComponent', () => {
  let component: PanelTableComponent;
  let fixture: ComponentFixture<PanelTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelTableComponent]
    });
    fixture = TestBed.createComponent(PanelTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
