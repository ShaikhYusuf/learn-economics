import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lesson13Component } from './lesson13.component';

describe('Lesson13Component', () => {
  let component: Lesson13Component;
  let fixture: ComponentFixture<Lesson13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lesson13Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lesson13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
