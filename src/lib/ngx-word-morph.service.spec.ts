import { TestBed } from '@angular/core/testing';

import { NgxWordMorphService } from './ngx-word-morph.service';

describe('NgxWordMorphService', () => {
  let service: NgxWordMorphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxWordMorphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
