import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CmsConfig,
  CmsService,
  CMSTabParagraphContainer,
  I18nTestingModule,
  SmartEditService,
  WindowRef,
} from '@spartacus/core';
import { of } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/index';
import { OutletDirective } from '../../../cms-structure/outlet/index';
import { ComponentWrapperDirective } from '../../../cms-structure/page/component/component-wrapper.directive';
import { LayoutConfig } from '../../../layout/config/layout-config';
import { TabParagraphContainerComponent } from './tab-paragraph-container.component';

@Component({
  selector: 'cx-test-cmp',
  template: '',
})
class TestComponent {
  tabTitleParam$ = of('title param');
}

const MockCmsModuleConfig: CmsConfig = {
  cmsComponents: {
    CMSTestComponent: {
      component: TestComponent,
    },
  },
};

const MockLayoutConfig: LayoutConfig = {};

const mockComponents = [
  'ProductDetailsTabComponent',
  'ProductSpecsTabComponent',
  'ProductReviewsTabComponent',
];

const mockComponentData: CMSTabParagraphContainer = {
  components: mockComponents.join(' '),
  container: 'true',
  name: 'Tab container',
  typeCode: 'CMSTabParagraphContainer',
  uid: 'TabPanelContainer',
};

const mockTabComponentData1 = {
  uid: 'ProductDetailsTabComponent',
  flexType: 'ProductDetailsTabComponent',
};

const mockTabComponentData2 = {
  uid: 'ProductSpecsTabComponent',
  flexType: 'ProductSpecsTabComponent',
};

const mockTabComponentData3 = {
  uid: 'ProductReviewsTabComponent',
  flexType: 'ProductReviewsTabComponent',
};

const MockCmsService = {
  getComponentData: () => of(),
};

const MockCmsComponentData = <CmsComponentData<CMSTabParagraphContainer>>{
  data$: of(mockComponentData),
};

class MockSmartEditService {
  isLaunchInSmartEdit(): boolean {
    return true;
  }
}

describe('TabParagraphContainerComponent', () => {
  let component: TabParagraphContainerComponent;
  let fixture: ComponentFixture<TabParagraphContainerComponent>;
  let cmsService: CmsService;
  let windowRef: WindowRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        TestComponent,
        TabParagraphContainerComponent,
        ComponentWrapperDirective,
        OutletDirective,
      ],
      providers: [
        WindowRef,
        { provide: CmsComponentData, useValue: MockCmsComponentData },
        { provide: CmsService, useValue: MockCmsService },
        { provide: CmsConfig, useValue: MockCmsModuleConfig },
        { provide: LayoutConfig, useValue: MockLayoutConfig },
        { provide: SmartEditService, useClass: MockSmartEditService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabParagraphContainerComponent);
    component = fixture.componentInstance;
    cmsService = TestBed.inject(CmsService);
    windowRef = TestBed.inject(WindowRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render child components', () => {
    spyOn(cmsService, 'getComponentData').and.returnValues(
      of(mockTabComponentData1),
      of(mockTabComponentData2),
      of(mockTabComponentData3)
    );
    let childComponents: any[];
    component.components$
      .subscribe((components) => (childComponents = components))
      .unsubscribe();

    for (let i = 0; i < childComponents.length; i++) {
      expect(childComponents[i]).toEqual({
        flexType: mockComponents[i],
        uid: mockComponents[i],
        title: `TabPanelContainer.tabs.${mockComponents[i]}`,
      });
    }
  });

  it('should be able to get the active tab number', () => {
    windowRef.nativeWindow.history.pushState(
      {
        activeTab: 1,
      },
      null
    );
    component.ngOnInit();
    // reset the state
    windowRef.nativeWindow.history.replaceState(null, null);
    expect(component.activeTabNum).toEqual(1);
  });

  it('should be able to get tab title parameters from children', () => {
    spyOn(cmsService, 'getComponentData').and.returnValues(
      of(mockTabComponentData1),
      of(mockTabComponentData2),
      of(mockTabComponentData3)
    );
    fixture.detectChanges();

    let childCompFixture: ComponentFixture<TestComponent>;
    childCompFixture = TestBed.createComponent(TestComponent);

    component.children.first.cmpRef = childCompFixture.componentRef;
    component.ngAfterViewInit();

    let param = '';
    component.tabTitleParams.forEach((param$) => {
      if (param$ != null) {
        param$.subscribe((value) => (param = value)).unsubscribe();
      }
    });

    expect(param).toEqual('title param');
  });
});
