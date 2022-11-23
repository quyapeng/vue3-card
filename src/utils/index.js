export const ROUTERS = {
  navigateTo(obj = {}) {
    uni.navigateTo(obj);
  },
  redirectTo(obj = {}) {
    uni.redirectTo(obj);
  },
  reLaunch(obj = {}) {
    uni.reLaunch(obj);
  },
  navigateBack(obj = {}) {
    uni.navigateBack(obj);
  },
  preloadPage(obj = {}) {
    uni.preloadPage(obj);
  },
};
