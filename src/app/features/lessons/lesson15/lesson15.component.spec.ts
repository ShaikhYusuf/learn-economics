import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lesson15Component } from './lesson15.component';

describe('Lesson15Component', () => {
  let component: Lesson15Component;
  let fixture: ComponentFixture<Lesson15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lesson15Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lesson15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
