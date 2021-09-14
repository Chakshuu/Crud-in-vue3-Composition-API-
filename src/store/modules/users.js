export default {
  namespaced: false,
  state: {
    users: [
      {
        id: 1,
        fname: 'Sam',
        lname: 'John',
        age: '25',
        gender: 'Male',
      },
      {
        id: 2,
        fname: 'Joe',
        lname: 'Root',
        age: '28',
        gender: 'Male',
      },
    ],
  },
  getters: {
    // eslint-disable-next-line arrow-body-style
    getUser: (state) => (id) => {
      return state.users.find((user) => user.id === id);
    },
  },
  mutations: {
    storeUser: (state, user) => {
      state.users.push(user);
    },
    updateUser: (state, updateUser) => {
      const index = state.users.findIndex((x) => x.id === updateUser.id);
      this.$set(state.users, index, updateUser);
    },
  },

};
