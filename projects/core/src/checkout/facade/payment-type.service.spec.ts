import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';
import { PaymentType } from '../../model/cart.model';
import { CheckoutActions } from '../store/actions/index';
import { AuthService } from '../../auth';
import { ActiveCartService } from '../../cart';
import { CheckoutState } from '../store/checkout-state';
import * as fromCheckoutReducers from '../store/reducers/index';
import { PROCESS_FEATURE } from '@spartacus/core';
import { PaymentTypeService } from './payment-type.service';
import * as fromProcessReducers from '../../process/store/reducers/index';

const userId = 'testUserId';
const cart = { code: 'testCartId', guid: 'testGuid' };

class ActiveCartServiceStub {
  cart;

  getActiveCartId() {
    return of(cart.code);
  }
}

class AuthServiceStub {
  userId;
  getOccUserId() {
    return of(userId);
  }
}
describe('PaymentTypeService', () => {
  let service: PaymentTypeService;
  let store: Store<CheckoutState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('checkout', fromCheckoutReducers.getReducers()),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        PaymentTypeService,
        { provide: ActiveCartService, useClass: ActiveCartServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
      ],
    });

    service = TestBed.inject(PaymentTypeService as Type<PaymentTypeService>);
    store = TestBed.inject(Store as Type<Store<CheckoutState>>);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should PaymentTypeService is injected', inject(
    [PaymentTypeService],
    (checkoutService: PaymentTypeService) => {
      expect(checkoutService).toBeTruthy();
    }
  ));

  it('should be able to get the payment types if data exist', () => {
    store.dispatch(
      new CheckoutActions.LoadPaymentTypesSuccess([
        { code: 'account', displayName: 'account' },
        { code: 'card', displayName: 'masterCard' },
      ])
    );

    let paymentTypes: PaymentType[];
    service.getPaymentTypes().subscribe((data) => {
      paymentTypes = data;
    });
    expect(paymentTypes).toEqual([
      { code: 'account', displayName: 'account' },
      { code: 'card', displayName: 'masterCard' },
    ]);
  });

  it('should be able to get the payment types after trigger data loading when they do not exist', () => {
    spyOn(service, 'loadPaymentTypes').and.callThrough();

    let types: PaymentType[];
    service
      .getPaymentTypes()
      .subscribe((data) => {
        types = data;
      })
      .unsubscribe();

    expect(types).toEqual([]);
    expect(service.loadPaymentTypes).toHaveBeenCalled();
  });

  it('should be able to load payment types', () => {
    service.loadPaymentTypes();
    expect(store.dispatch).toHaveBeenCalledWith(
      new CheckoutActions.LoadPaymentTypes()
    );
  });

  it('should be able to set selected payment type to cart', () => {
    service.setPaymentType('typeCode', 'poNumber');
    expect(store.dispatch).toHaveBeenCalledWith(
      new CheckoutActions.SetPaymentType({
        userId: userId,
        cartId: cart.code,
        typeCode: 'typeCode',
        poNumber: 'poNumber',
      })
    );
  });

  it('should be able to get selected payment type if data exist', () => {
    store.dispatch(
      new CheckoutActions.LoadPaymentTypesSuccess([
        { code: 'account', displayName: 'account' },
        { code: 'card', displayName: 'masterCard' },
      ])
    );
    store.dispatch(
      new CheckoutActions.SetPaymentType({
        userId: userId,
        cartId: cart.code,
        typeCode: 'CARD',
      })
    );

    let selected: string;
    service.getSelectedPaymentType().subscribe((data) => {
      selected = data;
    });
    expect(selected).toEqual('CARD');
  });

  it('should be able to set the default payment type if data not exist', () => {
    service.getSelectedPaymentType().subscribe();
    expect(store.dispatch).toHaveBeenCalledWith(
      new CheckoutActions.SetPaymentType({
        userId: userId,
        cartId: cart.code,
        typeCode: 'ACCOUNT',
        poNumber: undefined,
      })
    );
  });
});
