import { Action } from '@ngrx/store';
import { ConfiguratorTextfield } from '../../../../model/configurator-textfield.model';
import { GenericConfigurator } from '../../../../model/generic-configurator.model';
import { StateUtils } from '../../../../state/utils';
import { CONFIGURATION_TEXTFIELD_DATA } from '../configuration-textfield-state';

export const CREATE_CONFIGURATION =
  '[Configurator] Create Configuration Textfield';
export const CREATE_CONFIGURATION_FAIL =
  '[Configurator] Create Configuration Textfield Fail';
export const CREATE_CONFIGURATION_SUCCESS =
  '[Configurator] Create Configuration Textfield Success';
export const UPDATE_CONFIGURATION =
  '[Configurator] Update Configuration Textfield';
export const ADD_TO_CART = '[Configurator] Add to cart Textfield';
export const ADD_TO_CART_FAIL = '[Configurator] Add to cart Textfield Fail';
export const READ_CART_ENTRY_CONFIGURATION =
  '[Configurator] Read cart entry configuration Textfield';
export const READ_CART_ENTRY_CONFIGURATION_FAIL =
  '[Configurator] Read cart entry configuration Textfield Fail';
export const READ_CART_ENTRY_CONFIGURATION_SUCCESS =
  '[Configurator] Read cart entry configuration Textfield Success';
export const UPDATE_CART_ENTRY_CONFIGURATION =
  '[Configurator] Update cart entry configuration Textfield';
export const UPDATE_CART_ENTRY_CONFIGURATION_FAIL =
  '[Configurator] Update cart entry configuration Textfield Fail';

export const REMOVE_CONFIGURATION =
  '[Configurator] Remove Configuration Textfield';

export class CreateConfiguration extends StateUtils.LoaderLoadAction {
  readonly type = CREATE_CONFIGURATION;
  constructor(public payload: any) {
    super(CONFIGURATION_TEXTFIELD_DATA);
  }
}

export class CreateConfigurationFail extends StateUtils.LoaderFailAction {
  readonly type = CREATE_CONFIGURATION_FAIL;
  constructor(public payload: any) {
    super(CONFIGURATION_TEXTFIELD_DATA, payload);
  }
}

export class CreateConfigurationSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = CREATE_CONFIGURATION_SUCCESS;
  constructor(public payload: any) {
    super(CONFIGURATION_TEXTFIELD_DATA);
  }
}

export class UpdateConfiguration implements Action {
  readonly type = UPDATE_CONFIGURATION;
  constructor(public payload: any) {}
}

export class AddToCart extends StateUtils.LoaderLoadAction {
  readonly type = ADD_TO_CART;
  constructor(public payload: ConfiguratorTextfield.AddToCartParameters) {
    super(CONFIGURATION_TEXTFIELD_DATA);
  }
}

export class AddToCartFail extends StateUtils.LoaderFailAction {
  readonly type = ADD_TO_CART_FAIL;
  constructor(public payload: any) {
    super(CONFIGURATION_TEXTFIELD_DATA);
  }
}

export class UpdateCartEntryConfiguration extends StateUtils.LoaderLoadAction {
  readonly type = UPDATE_CART_ENTRY_CONFIGURATION;
  constructor(public payload: ConfiguratorTextfield.UpdateCartEntryParameters) {
    super(CONFIGURATION_TEXTFIELD_DATA);
  }
}

export class UpdateCartEntryConfigurationFail extends StateUtils.LoaderFailAction {
  readonly type = UPDATE_CART_ENTRY_CONFIGURATION_FAIL;
  constructor(public payload: any) {
    super(CONFIGURATION_TEXTFIELD_DATA);
  }
}

export class ReadCartEntryConfiguration extends StateUtils.LoaderLoadAction {
  readonly type = READ_CART_ENTRY_CONFIGURATION;
  constructor(
    public payload: GenericConfigurator.ReadConfigurationFromCartEntryParameters
  ) {
    super(CONFIGURATION_TEXTFIELD_DATA);
  }
}

export class ReadCartEntryConfigurationSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = READ_CART_ENTRY_CONFIGURATION_SUCCESS;
  constructor(public payload: any) {
    super(CONFIGURATION_TEXTFIELD_DATA);
  }
}

export class ReadCartEntryConfigurationFail extends StateUtils.LoaderFailAction {
  readonly type = READ_CART_ENTRY_CONFIGURATION_FAIL;
  constructor(public payload: any) {
    super(CONFIGURATION_TEXTFIELD_DATA);
  }
}

export class RemoveConfiguration extends StateUtils.LoaderResetAction {
  readonly type = REMOVE_CONFIGURATION;
  constructor(public payload: any) {
    super(CONFIGURATION_TEXTFIELD_DATA);
  }
}

export type ConfiguratorAction =
  | CreateConfiguration
  | CreateConfigurationFail
  | CreateConfigurationSuccess
  | UpdateConfiguration
  | ReadCartEntryConfigurationFail
  | ReadCartEntryConfigurationSuccess
  | ReadCartEntryConfiguration
  | UpdateCartEntryConfiguration
  | RemoveConfiguration;
