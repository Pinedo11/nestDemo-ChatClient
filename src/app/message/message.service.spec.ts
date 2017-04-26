import { inject, TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ MessageService ]
    });
  });

  it('should ...', inject([ MessageService ], (service:MessageService) => {
    expect(service).toBeTruthy();
  }));
});
