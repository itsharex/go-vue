import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    token: '',
    userInfo: {},
    roles: []
  }),
  getters: {
    getToken (state) {
      return state.token
    },
    getUserInfo (state) {
      return state.userInfo
    }
  },
  actions: {
    setToken (token) {
      this.token = token
    },
    setInfoToNUll () {
      this.token = ''
      this.userInfo = {}
    },
    setUserInfo (userData) {
      this.userInfo = userData
      this.setRoles()
    },
    setRoles () {
      this.roles = ['admin']
    }
  }
})
