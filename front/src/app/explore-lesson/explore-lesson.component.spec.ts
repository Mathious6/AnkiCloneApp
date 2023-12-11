import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreLessonComponent } from './explore-lesson.component';

describe('ExploreLessonComponent', () => {
  let component: ExploreLessonComponent;
  let fixture: ComponentFixture<ExploreLessonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreLessonComponent]
    });
    fixture = TestBed.createComponent(ExploreLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
