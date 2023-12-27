import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDeactivateModalComponent } from './settings-deactivate-modal.component';

describe('SettingsDeactivateModalComponent', () => {
  let component: SettingsDeactivateModalComponent;
  let fixture: ComponentFixture<SettingsDeactivateModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsDeactivateModalComponent]
    });
    fixture = TestBed.createComponent(SettingsDeactivateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
