import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, ReturnRequest } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ReturnRequestService } from '../return-request.service';
import { ReturnRequestOverviewComponent } from './return-request-overview.component';

const mockReturnRequest: ReturnRequest = {
  rma: 'test',
  returnEntries: [],
};

class MockReturnRequestService {
  cancelReturnRequest = jasmine.createSpy();
  cancelSuccess = jasmine.createSpy();
  getReturnRequest(): Observable<ReturnRequest> {
    return of(mockReturnRequest);
  }
  get isCancelSuccess$(): Observable<boolean> {
    return of(true);
  }
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('ReturnRequestOverviewComponent', () => {
  let component: ReturnRequestOverviewComponent;
  let fixture: ComponentFixture<ReturnRequestOverviewComponent>;
  let returnRequestService: MockReturnRequestService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [ReturnRequestOverviewComponent, MockUrlPipe],
      providers: [
        { provide: ReturnRequestService, useClass: MockReturnRequestService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnRequestOverviewComponent);
    component = fixture.componentInstance;

    returnRequestService = TestBed.get(ReturnRequestService as Type<
      ReturnRequestService
    >);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get cancel success', () => {
    component.returnRequest$.subscribe().unsubscribe();
    component.ngOnInit();
    expect(returnRequestService.cancelSuccess).toHaveBeenCalledWith('test');
  });

  it('should be able to cancel return', () => {
    component.cancelReturn('test');
    expect(returnRequestService.cancelReturnRequest).toHaveBeenCalledWith(
      'test'
    );
  });
});