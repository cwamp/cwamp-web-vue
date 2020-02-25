import * as types from "./mutation-types";
import render from "../utils/canvas";

const mutations = {
  [types.CTX_CREATED](state, canvas, ctx) {
    state.canvas = canvas;
    state.ctx = ctx;
  },
  [types.IMAGE_CHANGED](state, imageUrl, filename, filetype, fileext) {
    state.imageUrl = imageUrl;
    state.filename = filename;
    state.filetype = filetype;
    state.fileext = fileext;
  },
  [types.IMAGE_LOADED](state, image) {
    state.image = image;
  },
  [types.TEXTAREA_CHANGED](state, text) {
    state.text = text;
  },
  [types.COLOR_CHANGED](state, colorIndex) {
    state.colorIndex = colorIndex;
  },
  [types.OPACITY_CHANGED](state, opacity) {
    state.opacity = opacity;
  },
  [types.SHOW_APP_NAME_CHANGED](state, showAppName) {
    state.showAppName = showAppName;
  },
  [types.RENDER](state) {
    render(state);
  }
};

export default mutations;
