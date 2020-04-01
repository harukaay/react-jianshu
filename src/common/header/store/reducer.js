import * as constants from "./constants";
import { fromJS } from "immutable";

const defaultState = fromJS({
  focused: false,
  mouseIn: false,
  list: [],
  page: 1,
  totalPage: 1
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.SEARCH_FOCUS:
      return state.set("focused", true);
    case constants.SEARCH_BLUR:
      return state.set("focused", false);
    case constants.MOUSE_ENTER:
      return state.set("mouseIn", true);
    case constants.MOUSE_LEAVE:
      return state.set("mouseIn", false);
    case constants.CHANGE_PAGE:
      const page = state.get("page");
      const totalPage = state.get("totalPage");
      return page < totalPage
        ? state.set("page", page + 1)
        : state.set("page", 1);

    case constants.CHANGE_LIST:
      return state.merge({
        list:action.data,
        totalPage:action.totalPage
      })
    default:
      return state;
  }
};
