import { UserPreferences } from './user-preferance.entity';

export const userPreferencesProviders = [{ provide: 'UserPreferencesRepository', useValue: UserPreferences }];