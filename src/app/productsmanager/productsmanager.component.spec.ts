import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsmanagerComponent } from './productsmanager.component';

describe('ProductsmanagerComponent', () => {
  let component: ProductsmanagerComponent;
  let fixture: ComponentFixture<ProductsmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsmanagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
