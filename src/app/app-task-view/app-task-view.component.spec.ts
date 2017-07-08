import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTaskViewComponent } from './app-task-view.component';

describe('AppTaskViewComponent', () => {
  let component: AppTaskViewComponent;
  let fixture: ComponentFixture<AppTaskViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTaskViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
