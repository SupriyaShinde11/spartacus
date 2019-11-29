import * as ConfiguratorActions from '../actions/configurator-textfield.action';
import { ConfigurationTextfieldState } from '../configuration-textfield-state';

export const initialState: ConfigurationTextfieldState = {
  content: null,
  refresh: false,
};

export function reducer(
  state = initialState,
  action:
    | ConfiguratorActions.CreateConfiguration
    | ConfiguratorActions.CreateConfigurationSuccess
): ConfigurationTextfieldState {
  switch (action.type) {
    case ConfiguratorActions.CREATE_CONFIGURATION_SUCCESS: {
      const content = { ...action.payload };

      return {
        content: content,
        refresh: false,
      };
    }
  }
  return state;
}