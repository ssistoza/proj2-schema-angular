// Must be change to our production server.
const context = 'http://18.219.30.69:8090/scrumhub/api';

export const environment = {
  production: true,
  context: context,

  user: {
    create: () => `${context}/user/create`,
    get: (userid: number) => `${context}/user/${userid}`,
    all: () => `${context}/user/all`,
    update: () => `${context}/user/update`,
    delete: () => `${context}/user/delete`,
    login: () => `${context}/user/login`
  },

  board: {
    create: () => `${context}/board/create`,
    update: () => `${context}/board/update`
  },

  boardmember: {
    create: () => `${context}/boardmember/create`,
    update: () => `${context}/boardmember/update`,
    delete: () => `${context}/boardmember/delete`
  },

  roles: {
    get: (roleid: number) => `${context}/roles/${roleid}`
  },

  swimlanestatus: {
    get: (statusid: number) => `${context}/swimlanestatus/${statusid}`,
    update: () => `${context}/swimlanestatus/update`
  },

  story: {
    get: (storyid: number) => `${context}/story/${storyid}`,
    create: () => `${context}/story/create`
  },

  task: {
    get: (taskid: number) => `${context}/task/${taskid}`,
    create: () => `${context}/task/create`,
    update: () => `${context}/task/update`
  }
};
