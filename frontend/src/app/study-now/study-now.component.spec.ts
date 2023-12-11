import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyNowComponent } from './study-now.component';

describe('StudyNowComponent', () => {
  let component: StudyNowComponent;
  let fixture: ComponentFixture<StudyNowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudyNowComponent]
    });
    fixture = TestBed.createComponent(StudyNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
