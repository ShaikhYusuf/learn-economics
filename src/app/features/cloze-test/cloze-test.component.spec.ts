import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClozeTestComponent } from './cloze-test.component';

describe('ClozeTestComponent', () => {
  let component: ClozeTestComponent;
  let fixture: ComponentFixture<ClozeTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClozeTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClozeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
