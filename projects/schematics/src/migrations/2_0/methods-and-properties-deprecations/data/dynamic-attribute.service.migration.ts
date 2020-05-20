import {
  ADD_DYNAMIC_ATTRIBUTES,
  DYNAMIC_ATTRIBUTE_SERVICE,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/cms/services/dynamic-attribute.service.ts
export const DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: DYNAMIC_ATTRIBUTE_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: ADD_DYNAMIC_ATTRIBUTES,
    comment: `// ${TODO_SPARTACUS} Method ${ADD_DYNAMIC_ATTRIBUTES} has changed the parameter order. Please refer to the migration guide on how to resolve this change.`,
  },
];
