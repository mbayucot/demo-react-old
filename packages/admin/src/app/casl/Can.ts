import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import { AppAbility } from './ability';

// @ts-ignore
export const AbilityContext = createContext<AppAbility>(null);

export const Can = createContextualCan(AbilityContext.Consumer);
