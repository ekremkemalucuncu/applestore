import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoirmanagerComponent } from './accessoirmanager.component';

describe('AccessoirmanagerComponent', () => {
  let component: AccessoirmanagerComponent;
  let fixture: ComponentFixture<AccessoirmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessoirmanagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessoirmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
