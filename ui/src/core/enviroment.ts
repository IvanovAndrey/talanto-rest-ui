const baseUrl = 'http://localhost:8080/api/';
const clientPrefix = baseUrl + 'client/';

export function createEnv() {
  return {
    clientPrefix,
    signIn: baseUrl + 'sign-in',
    signUp: baseUrl + 'sign-up',
    signOut: baseUrl + 'signOut',

    getClient: clientPrefix,
    getUserById: baseUrl + 'getUserById',
    setComplaint: baseUrl + 'setComplaint',
    setRequest: baseUrl + 'setRequest',
    getNotifications: baseUrl + 'getNotifications',
    getSingleNotification: baseUrl + 'getSingleNotification',
    getLessons: baseUrl + 'getLessons'
  };
}

export let environment = createEnv();
