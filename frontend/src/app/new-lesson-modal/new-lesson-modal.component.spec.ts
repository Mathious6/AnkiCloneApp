import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLessonModalComponent } from './new-lesson-modal.component';

describe('NewLessonModalComponent', () => {
  let component: NewLessonModalComponent;
  let fixture: ComponentFixture<NewLessonModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewLessonModalComponent]
    });
    fixture = TestBed.createComponent(NewLessonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
