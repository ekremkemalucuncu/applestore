import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateorupdateproductComponent } from './createorupdateproduct.component';

describe('CreateorupdateproductComponent', () => {
  let component: CreateorupdateproductComponent;
  let fixture: ComponentFixture<CreateorupdateproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateorupdateproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateorupdateproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
