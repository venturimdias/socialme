import Vue from 'vue'
import Vuex from 'vuex'

//import axios from "axios"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userCurrent: '',
    following: [],
    isFollow: false
  },
  mutations: {
    setFollowing(state, setState){
      let list = state.following
      let isHas = false

      // percorro o array para verificar se existe o id da pessoa a ser seguida
      for(var i = 0; i < list.length; i++){
        if(list[i].id === setState.id){    
          isHas = false
        }else{
          isHas = true  
        }
      }

      // adiciono ou não no array
      if(list.length === 0 || isHas === true){
        state.following.push(setState)
      }else{
        console.log('Ops! você já segue esta pessoa')
      }
    },
    setUnFollow(state, setState){
      state.following.splice(setState,1)
    },
    setUnFollowRemove(state, setState){
      let list = state.following

      for (var index in list) {      
        // comprar o id com o setState(id) e pelo indice remove o user
        if(list[index].id === setState){
          state.following.splice(index,1)
        }
      }

    },
    setUnFollowBtn(state, setState){  
      // ativar e desativar o votão unfollow
      state.isFollow = setState
    }
  },
  actions: {
  },
  modules: {
  }
})
