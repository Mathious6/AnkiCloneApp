import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFactPackageComponent } from './delete-fact-package.component';

describe('DeleteFactPackageComponent', () => {
  let component: DeleteFactPackageComponent;
  let fixture: ComponentFixture<DeleteFactPackageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteFactPackageComponent]
    });
    fixture = TestBed.createComponent(DeleteFactPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
