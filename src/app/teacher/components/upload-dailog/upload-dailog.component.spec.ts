import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDailogComponent } from './upload-dailog.component';

describe('UploadDailogComponent', () => {
  let component: UploadDailogComponent;
  let fixture: ComponentFixture<UploadDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDailogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
