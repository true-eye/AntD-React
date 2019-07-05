export function getView(width) {
  let newView = "MobileView";
  if (width > 1220) {
    newView = "DesktopView";
  } else if (width > 767) {
    newView = "TabView";
  }
  return newView;
}
const actions = {
  COLLPSE_CHANGE: "COLLPSE_CHANGE",
  COLLPSE_OPEN_DRAWER: "COLLPSE_OPEN_DRAWER",
  CHANGE_OPEN_KEYS: "CHANGE_OPEN_KEYS",
  TOGGLE_ALL: "TOGGLE_ALL",
  CHANGE_CURRENT: "CHANGE_CURRENT",
  CLEAR_MENU: "CLEAR_MENU",
  CHANGE_PROPERTY: "CHANGE_PROPERTY",
  CHANGE_LISTING: "CHANGE_LISTING",
  SETUP_DEMO: "SETUP_DEMO",
  toggleCollapsed: () => ({
    type: actions.COLLPSE_CHANGE
  }),
  changeProperty: key => {
    return {
      type: actions.CHANGE_PROPERTY,
      key: key
    };
  },
  changeListing: (key) => {
    return {
      type: actions.CHANGE_LISTING,
      key: key
    };
  },
  demoSetup: data => {
    return {
      type: actions.SETUP_DEMO,
      data: data
    };
  },
  toggleAll: (width, height) => {
    const view = getView(width);
    const collapsed = view !== "DesktopView";
    return {
      type: actions.TOGGLE_ALL,
      collapsed,
      view,
      height
    };
  },
  toggleOpenDrawer: () => ({
    type: actions.COLLPSE_OPEN_DRAWER
  }),
  changeOpenKeys: openKeys => ({
    type: actions.CHANGE_OPEN_KEYS,
    openKeys
  }),
  changeCurrent: current => ({
    type: actions.CHANGE_CURRENT,
    current
  }),
  clearMenu: () => ({ type: actions.CLEAR_MENU })
};
export default actions;
