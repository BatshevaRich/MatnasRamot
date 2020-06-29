import { UserAuth } from '../Classes/UserAuth';

export const LOGIN_MOCKS: UserAuth[] = [
    {
        userName: 'BJones',
        bearerToken: 'sd9f923k3kdmcjkhd',
        isAuthenticated: true,
        canAccessVolunteers: true,
        canAddVolunteer: false,
        canSaveVolunteer: false,
        canAccessCategories: true,
        canAddCategory: true
      }
];
