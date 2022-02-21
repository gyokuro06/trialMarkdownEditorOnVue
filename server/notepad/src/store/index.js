import { createStore } from 'vuex'
import createdPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createdPersistedState()],
  state: {
    memos: [
      { id: 1, body: '# init' },
    ],
    usingId: 0
  },
  getters: {
    maxId(state) {
      console.log("Vuex: maxId getter.(%d, %d)", state.memos.length, state.memos[state.memos.length - 1].id);
      return state.memos[state.memos.length - 1].id
    },
    usingId(state) {
      console.log("Vuex: usingId getter.(%d)", state.usingId);
      return state.usingId;
    },
    usingMemo: (state) => (id) => {
      console.log("Vuex: usingMemo getter.(%d)", id);
      return state.memos.find(memo => memo.id === id);
    }
  },
  mutations: {
    save(state, memo) {
      console.log("Vuex: save commited.(%d, %s)", memo.id, memo.body);
      if (memo === null) return;

      const existsAtIndex = state.memos.findIndex(m => m.id === memo.id);
      if (existsAtIndex !== -1) {
        state.memos[existsAtIndex] = memo;
      } else {
        state.memos.push(memo);
      }
    },
    lockId(state, id) {
      state.usingId = id;
      console.log("Vuex: lockId commited.(%d, %d)", id, this.state.usingId);
    }
  },
  actions: {
  },
  modules: {
  }
})
