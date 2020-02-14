import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import {
  I18nTestingModule,
  RoutingService,
  CostCenterService,
  CxDatePipe,
  RoutesConfig,
  RoutingConfig,
  CostCenter,
} from '@spartacus/core';

import { CostCenterDetailsComponent } from './cost-center-details.component';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { TableModule } from '../../../../shared/components/table/table.module';

const costCenterCode = 'b1';

const mockCostCenter: CostCenter = {
  code: costCenterCode,
  name: 'costCenter1',
  costCenter: 2230,
  currency: {
    symbol: '$',
    isocode: 'USD',
  },
  startDate: '2010-01-01T00:00:00+0000',
  endDate: '2034-07-12T00:59:59+0000',
  orgUnit: { name: 'orgName' },
  costCenters: [
    { name: 'costCenter1', code: 'cc1' },
    { name: 'costCenter2', code: 'cc2' },
  ],
};
const mockCostCenterUI: any = {
  code: costCenterCode,
  name: 'costCenter1',
  costCenter: 2230,
  currency: {
    isocode: 'USD',
    symbol: '$',
  },
  startDate: '2010-01-01T00:00:00+0000',
  endDate: '2034-07-12T00:59:59+0000',
  orgUnit: { name: 'orgName' },
  costCenters: [
    { name: 'costCenter1', costCenterCode: 'cc1' },
    { name: 'costCenter2', costCenterCode: 'cc2' },
  ],
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockCostCenterService implements Partial<CostCenterService> {
  loadCostCenter = createSpy('loadCostCenter');
  get = createSpy('get').and.returnValue(of(mockCostCenter));
  update = createSpy('update');
}

const mockRouterState = {
  state: {
    params: {
      costCenterCode,
    },
  },
};

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState = createSpy('getRouterState').and.returnValue(
    of(mockRouterState)
  );
}

const mockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;
class MockRoutingConfig {
  getRouteConfig(routeName: string) {
    return mockRoutesConfig[routeName];
  }
}

class MockCxDatePipe {
  transform(value: string) {
    return value.split('T')[0];
  }
}

describe('CostCenterDetailsComponent', () => {
  let component: CostCenterDetailsComponent;
  let fixture: ComponentFixture<CostCenterDetailsComponent>;
  let costCentersService: MockCostCenterService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TableModule, I18nTestingModule],
      declarations: [CostCenterDetailsComponent, MockUrlPipe],
      providers: [
        { provide: CxDatePipe, useClass: MockCxDatePipe },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CostCenterService, useClass: MockCostCenterService },
      ],
    }).compileComponents();

    costCentersService = TestBed.get(CostCenterService as Type<
      CostCenterService
    >);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load costCenter', () => {
      component.ngOnInit();
      let costCenter: any;
      component.costCenter$
        .subscribe(value => {
          costCenter = value;
        })
        .unsubscribe();
      expect(routingService.getRouterState).toHaveBeenCalled();
      expect(costCentersService.loadCostCenter).toHaveBeenCalledWith(
        costCenterCode
      );
      expect(costCentersService.get).toHaveBeenCalledWith(costCenterCode);
      expect(costCenter).toEqual(mockCostCenterUI);
    });
  });

  describe('update', () => {
    it('should update costCenter', () => {
      component.ngOnInit();

      component.update({ active: false });
      expect(costCentersService.update).toHaveBeenCalledWith(costCenterCode, {
        active: false,
      });

      component.update({ active: true });
      expect(costCentersService.update).toHaveBeenCalledWith(costCenterCode, {
        active: true,
      });
    });
  });
});