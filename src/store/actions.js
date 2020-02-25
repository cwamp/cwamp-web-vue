import * as actionTypes from "./action-types";
import * as types from "./mutation-types";
import loadImage from "../utils/image";

const actions = {
  [actionTypes.SWITCH_CTX]({ commit }, { canvas, ctx }) {
    commit(types.CTX_CREATED, canvas, ctx);
  },
  [actionTypes.SWITCH_IMAGE](
    { commit },
    { imageUrl, filename, filetype, fileext }
  ) {
    loadImage(imageUrl)
      .then(image => {
        commit(types.IMAGE_CHANGED, imageUrl, filename, filetype, fileext);
        commit(types.IMAGE_LOADED, image);
        commit(types.RENDER);
      })
      .catch(console.error);
  },
  [actionTypes.SWITCH_TEXTAREA]({ commit }, { text }) {
    commit(types.TEXTAREA_CHANGED, text);
    commit(types.RENDER);
  },
  [actionTypes.SWITCH_COLOR]({ commit }, { colorIndex }) {
    commit(types.COLOR_CHANGED, colorIndex);
    commit(types.RENDER);
  },
  [actionTypes.SWITCH_OPACITY]({ commit }, { opacity }) {
    commit(types.OPACITY_CHANGED, opacity);
    commit(types.RENDER);
  },
  [actionTypes.SWITCH_SHOW_APP_NAME]({ commit }, { showAppName }) {
    commit(types.SHOW_APP_NAME_CHANGED, showAppName);
    commit(types.RENDER);
  }
};

export default actions;
