import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxWordMorphComponent } from './ngx-word-morph.component';

describe('NgxWordMorphComponent', () => {
  let component: NgxWordMorphComponent;
  let fixture: ComponentFixture<NgxWordMorphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxWordMorphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxWordMorphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
