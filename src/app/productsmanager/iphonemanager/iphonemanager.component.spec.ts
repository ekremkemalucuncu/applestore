import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IphonemanagerComponent } from './iphonemanager.component';

describe('IphonemanagerComponent', () => {
  let component: IphonemanagerComponent;
  let fixture: ComponentFixture<IphonemanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IphonemanagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IphonemanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
