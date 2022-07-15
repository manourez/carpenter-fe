import { TestBed } from '@angular/core/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'

import { AlertService } from './alert.service'

describe('AlertService', () => {
  let service: AlertService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [AlertService],
    })
    service = TestBed.inject(AlertService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
