import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLineComponent } from './single-line.component';

describe('SingleLineComponent', () => {
  let component: SingleLineComponent;
  let fixture: ComponentFixture<SingleLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
