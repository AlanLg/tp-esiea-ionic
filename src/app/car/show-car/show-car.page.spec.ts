import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowCarPage } from './show-car.page';

describe('ShowCarPage', () => {
  let component: ShowCarPage;
  let fixture: ComponentFixture<ShowCarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
