import { Action } from '@ngrx/store';
import { Configurator } from '../../../../model/configurator.model';
import { GenericConfigurator } from '../../../../model/generic-configurator.model';
import { StateUtils } from '../../../../state/utils/index';
import { CONFIGURATION_DATA } from '../configuration-state';

export const CREATE_CONFIGURATION = '[Configurator] Create Configuration';
export const CREATE_CONFIGURATION_FAIL =
  '[Configurator] Create Configuration Fail';
export const CREATE_CONFIGURATION_SUCCESS =
  '[Configurator] Create Configuration Sucess';
export const READ_CONFIGURATION = '[Configurator] Read Configuration';
export const READ_CONFIGURATION_FAIL = '[Configurator] Read Configuration Fail';
export const READ_CONFIGURATION_SUCCESS =
  '[Configurator] Read Configuration Sucess';
export const READ_CART_ENTRY_CONFIGURATION =
  '[Configurator] Read Cart Entry Configuration';
export const READ_CART_ENTRY_CONFIGURATION_SUCCESS =
  '[Configurator] Read Cart Entry Configuration Success';
export const READ_CART_ENTRY_CONFIGURATION_FAIL =
  '[Configurator] Read Cart Entry Configuration Fail';
export const UPDATE_CONFIGURATION = '[Configurator] Update Configuration';
export const UPDATE_CONFIGURATION_FAIL =
  '[Configurator] Update Configuration Fail';
export const UPDATE_CONFIGURATION_SUCCESS =
  '[Configurator] Update Configuration Success';

export const UPDATE_CONFIGURATION_FINALIZE_SUCCESS =
  '[Configurator] Update Configuration finalize success';
export const UPDATE_CONFIGURATION_FINALIZE_FAIL =
  '[Configurator] Update Configuration finalize fail';
export const CHANGE_GROUP = '[Configurator] Change group';
export const CHANGE_GROUP_FINALIZE = '[Configurator] Change group finalize';
export const ADD_TO_CART = '[Configurator] Add to cart';
export const UPDATE_CART_ENTRY = '[Configurator] Update cart entry';
export const UPDATE_CART_ENTRY_SUCCESS =
  '[Configurator] Update cart entry success';

export const REMOVE_CONFIGURATION = '[Configurator] Remove configuration';

export const UPDATE_PRICE_SUMMARY =
  '[Configurator] Update Configuration Summary Price';
export const UPDATE_PRICE_SUMMARY_FAIL =
  '[Configurator] Update Configuration Price Summary fail';
export const UPDATE_PRICE_SUMMARY_SUCCESS =
  '[Configurator] Update Configuration Price Summary success';
export const ADD_NEXT_OWNER = '[Configurator] Add next owner';
export const SET_NEXT_OWNER_CART_ENTRY =
  '[Configurator] Set next owner cart entry';

export const GET_CONFIGURATION_OVERVIEW =
  '[Configurator] Get Configuration Overview';
export const GET_CONFIGURATION_OVERVIEW_FAIL =
  '[Configurator] Get Configuration Overview fail';
export const GET_CONFIGURATION_OVERVIEW_SUCCESS =
  '[Configurator] Get Configuration Overview success';

export class CreateConfiguration extends StateUtils.EntityLoadAction {
  readonly type = CREATE_CONFIGURATION;
  constructor(public ownerKey: string, public productCode: string) {
    super(CONFIGURATION_DATA, ownerKey);
  }
}

export class ReadCartEntryConfiguration extends StateUtils.EntityLoadAction {
  readonly type = READ_CART_ENTRY_CONFIGURATION;
  constructor(
    public payload: GenericConfigurator.ReadConfigurationFromCartEntryParameters
  ) {
    super(CONFIGURATION_DATA, payload.owner.key);
  }
}

export class ReadCartEntryConfigurationSuccess extends StateUtils.EntitySuccessAction {
  readonly type = READ_CART_ENTRY_CONFIGURATION_SUCCESS;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.owner.key);
  }
}

export class ReadCartEntryConfigurationFail extends StateUtils.EntityFailAction {
  readonly type = READ_CART_ENTRY_CONFIGURATION_FAIL;
  constructor(ownerkey: string, public payload: any) {
    super(CONFIGURATION_DATA, ownerkey, payload);
  }
}

export class CreateConfigurationFail extends StateUtils.EntityFailAction {
  readonly type = CREATE_CONFIGURATION_FAIL;
  constructor(public ownerKey: string, public payload: any) {
    super(CONFIGURATION_DATA, ownerKey, payload);
  }
}

export class CreateConfigurationSuccess extends StateUtils.EntitySuccessAction {
  readonly type = CREATE_CONFIGURATION_SUCCESS;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.owner.key);
  }
}

export class ReadConfiguration extends StateUtils.EntityLoadAction {
  readonly type = READ_CONFIGURATION;
  constructor(
    public configuration: Configurator.Configuration,
    public groupId: string
  ) {
    super(CONFIGURATION_DATA, configuration.owner.key);
  }
}

export class ReadConfigurationFail extends StateUtils.EntityFailAction {
  readonly type = READ_CONFIGURATION_FAIL;
  constructor(ownerkey: string, public payload: any) {
    super(CONFIGURATION_DATA, ownerkey, payload);
  }
}

export class ReadConfigurationSuccess extends StateUtils.EntitySuccessAction {
  readonly type = READ_CONFIGURATION_SUCCESS;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.owner.key);
  }
}

export class UpdateConfiguration extends StateUtils.EntityProcessesIncrementAction {
  readonly type = UPDATE_CONFIGURATION;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.owner.key);
    this.meta.loader = {
      load: true,
    };
  }
}

export class UpdateConfigurationFail extends StateUtils.EntityProcessesDecrementAction {
  readonly type = UPDATE_CONFIGURATION_FAIL;
  constructor(ownerKey: string, public payload: any) {
    super(CONFIGURATION_DATA, ownerKey);
    this.meta.loader = {
      error: payload,
    };
  }
}

export class UpdateConfigurationSuccess extends StateUtils.EntityProcessesDecrementAction {
  readonly type = UPDATE_CONFIGURATION_SUCCESS;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.owner.key);
  }
}

export class UpdateConfigurationFinalizeSuccess extends StateUtils.EntitySuccessAction {
  readonly type = UPDATE_CONFIGURATION_FINALIZE_SUCCESS;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.owner.key);
  }
}

export class UpdateConfigurationFinalizeFail extends StateUtils.EntitySuccessAction {
  readonly type = UPDATE_CONFIGURATION_FINALIZE_FAIL;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.owner.key);
  }
}

export class UpdatePriceSummary extends StateUtils.EntityLoadAction {
  readonly type = UPDATE_PRICE_SUMMARY;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.owner.key);
  }
}
export class UpdatePriceSummaryFail extends StateUtils.EntityFailAction {
  readonly type = UPDATE_PRICE_SUMMARY_FAIL;
  constructor(ownerKey: string, public payload: any) {
    super(CONFIGURATION_DATA, ownerKey, payload);
  }
}

export class UpdatePriceSummarySuccess extends StateUtils.EntitySuccessAction {
  readonly type = UPDATE_PRICE_SUMMARY_SUCCESS;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.owner.key);
  }
}

export class ChangeGroup extends StateUtils.EntityLoadAction {
  readonly type = CHANGE_GROUP;
  constructor(
    public configuration: Configurator.Configuration,
    public groupId: string,
    public parentGroupId: string
  ) {
    super(CONFIGURATION_DATA, configuration.owner.key);
  }
}

export class ChangeGroupFinalize extends StateUtils.EntityLoadAction {
  readonly type = CHANGE_GROUP_FINALIZE;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.owner.key);
  }
}

export class AddToCart extends StateUtils.EntityLoadAction {
  readonly type = ADD_TO_CART;
  constructor(public payload: Configurator.AddToCartParameters) {
    super(CONFIGURATION_DATA, payload.ownerKey);
  }
}

export class UpdateCartEntry extends StateUtils.EntityLoadAction {
  readonly type = UPDATE_CART_ENTRY;
  constructor(
    public payload: Configurator.UpdateConfigurationForCartEntryParameters
  ) {
    super(CONFIGURATION_DATA, payload.configuration.owner.key);
  }
}

export class UpdateCartEntrySuccess extends StateUtils.EntitySuccessAction {
  readonly type = UPDATE_CART_ENTRY_SUCCESS;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.owner.key);
  }
}

export class RemoveConfiguration extends StateUtils.EntityLoaderResetAction {
  readonly type = REMOVE_CONFIGURATION;
  constructor(ownerKey: string | string[]) {
    super(CONFIGURATION_DATA, ownerKey);
  }
}

export class GetConfigurationOverview extends StateUtils.EntityLoadAction {
  readonly type = GET_CONFIGURATION_OVERVIEW;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.owner.key);
  }
}

export class GetConfigurationOverviewFail extends StateUtils.EntityFailAction {
  readonly type = GET_CONFIGURATION_OVERVIEW_FAIL;
  constructor(public ownerKey: string, public payload: any) {
    super(CONFIGURATION_DATA, ownerKey, payload);
  }
}

export class GetConfigurationOverviewSuccess extends StateUtils.EntitySuccessAction {
  readonly type = GET_CONFIGURATION_OVERVIEW_SUCCESS;
  constructor(public ownerKey: string, public payload: Configurator.Overview) {
    super(CONFIGURATION_DATA, ownerKey);
  }
}

export class AddNextOwner implements Action {
  readonly type = ADD_NEXT_OWNER;
  constructor(public ownerKey: string, public cartEntryNo: string) {}
}

export class SetNextOwnerCartEntry extends StateUtils.EntitySuccessAction {
  readonly type = SET_NEXT_OWNER_CART_ENTRY;

  constructor(
    public payload: Configurator.Configuration,
    public cartEntryNo: string
  ) {
    super(CONFIGURATION_DATA, payload.owner.key);
  }
}
export type ConfiguratorAction =
  | CreateConfiguration
  | CreateConfigurationFail
  | CreateConfigurationSuccess
  | ReadConfiguration
  | ReadConfigurationFail
  | ReadConfigurationSuccess
  | UpdateConfiguration
  | UpdateConfigurationFail
  | UpdateConfigurationSuccess
  | UpdateConfigurationFinalizeFail
  | UpdateConfigurationFinalizeSuccess
  | UpdatePriceSummary
  | UpdatePriceSummaryFail
  | UpdatePriceSummarySuccess
  | ChangeGroup
  | ChangeGroupFinalize
  | GetConfigurationOverview
  | GetConfigurationOverviewFail
  | GetConfigurationOverviewSuccess
  | AddNextOwner
  | SetNextOwnerCartEntry
  | ReadCartEntryConfiguration
  | ReadCartEntryConfigurationSuccess
  | ReadCartEntryConfigurationFail
  | UpdateCartEntry
  | UpdateCartEntrySuccess
  | RemoveConfiguration;
