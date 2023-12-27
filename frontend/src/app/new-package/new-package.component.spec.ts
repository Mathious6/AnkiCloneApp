import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPackageComponent } from './new-package.component';

describe('NewPackageComponent', () => {
  let component: NewPackageComponent;
  let fixture: ComponentFixture<NewPackageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPackageComponent]
    });
    fixture = TestBed.createComponent(NewPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
