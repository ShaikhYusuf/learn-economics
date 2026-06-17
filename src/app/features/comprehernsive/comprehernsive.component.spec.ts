import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprehernsiveComponent } from './comprehernsive.component';

describe('ComprehernsiveComponent', () => {
  let component: ComprehernsiveComponent;
  let fixture: ComponentFixture<ComprehernsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComprehernsiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprehernsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
