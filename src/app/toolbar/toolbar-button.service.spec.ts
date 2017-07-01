import { TestBed, inject } from '@angular/core/testing';

import { ToolbarButtonService } from './toolbar-button.service';

describe('ToolbarButtonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToolbarButtonService]
    });
  });

  it('should ...', inject([ToolbarButtonService], (service: ToolbarButtonService) => {
    expect(service).toBeTruthy();
  }));
});
