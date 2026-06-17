import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lesson17Component } from './lesson17.component';

describe('Lesson17Component', () => {
  let component: Lesson17Component;
  let fixture: ComponentFixture<Lesson17Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lesson17Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lesson17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
