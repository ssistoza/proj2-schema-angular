// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// const context = 'http://localhost:8090/scrumhub/api';
const context = 'http://18.219.30.69:8090/scrumhub/api';

export const environment = {
  production: false,
  context: context,

  user: {
    create: () => `${context}/user/create`,
    get: (userid: number) => `${context}/user/${userid}`,
    getByUser: () => `${context}/user/checkExists/`,
    all: () => `${context}/user/all`,
    update: () => `${context}/user/update`,
    delete: () => `${context}/user/delete`,
    login: () => `${context}/user/login`,
    exists: () => `${context}/user/checkExists`
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
    create: () => `${context}/story/create`,
    update: () => `${context}/story/update`,
    reorder: () => `${context}/story/reorder`,
    move: () => `${context}/story/move`
  },

  task: {
    get: (taskid: number) => `${context}/task/${taskid}`,
    create: () => `${context}/task/create`,
    update: () => `${context}/task/update`,
    delete: () => `${context}/task/delete`
  },

  swimlane: {
    get: (swimlaneid: number) => `${context}/swimlane/${swimlaneid}`,
    create: () => `${context}/swimlane/create`,
    update: () => `${context}/swimlane/update`,
    reorder: () => `${context}/swimlane/reorder`
  }
};
