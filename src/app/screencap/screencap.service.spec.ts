import { TestBed, inject } from '@angular/core/testing';

import { ScreencapService } from './screencap.service';

describe('ScreencapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScreencapService]
    });
  });

  it('should ...', inject([ScreencapService], (service: ScreencapService) => {
    expect(service).toBeTruthy();
  }));
});
