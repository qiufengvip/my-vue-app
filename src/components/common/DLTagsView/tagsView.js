const state = {
  visitedViews: [],
};

const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some((v) => v.path === view.path)) return;
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.tagName || 'no-name',
      })
    );
  },

  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1);
        break;
      }
    }
  },

  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = state.visitedViews.filter((v) => {
      return v.meta.isDefault || v.path === view.path;
    });
  },

  DEL_ALL_VISITED_VIEWS: (state) => {
    const affixTags = state.visitedViews.filter((tag) => tag.meta.isDefault);
    state.visitedViews = affixTags;
  },
  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view);
        break;
      }
    }
  },
};

const actions = {
  addView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view);
  },

  delView({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('DEL_VISITED_VIEW', view);
      // console.log(state.visitedViews);
      resolve({
        visitedViews: [...state.visitedViews],
      });
    });
  },

  delOthersViews({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('DEL_OTHERS_VISITED_VIEWS', view);
      resolve({
        visitedViews: [...state.visitedViews],
      });
    });
  },

  delAllViews({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('DEL_ALL_VISITED_VIEWS');
      resolve({
        visitedViews: [...state.visitedViews],
      });
    });
  },

  updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
