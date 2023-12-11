import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDecksComponent } from './shared-decks.component';

describe('SharedDecksComponent', () => {
  let component: SharedDecksComponent;
  let fixture: ComponentFixture<SharedDecksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedDecksComponent]
    });
    fixture = TestBed.createComponent(SharedDecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
