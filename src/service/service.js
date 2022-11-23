import { ROUTERS } from "@/utils/index";
import { TOKEN, Pages } from "@/constant/common";
const config = {
  baseUrl: VUE_APP_BASE_URL,
  timeout: 15000,
  header: {
    "Content-Type": "application/json",
  },
};
const request = ({ url, method = "GET", data, header = {} }) => {
  const token = uni.getStorageSync(TOKEN);
  config.header["Authorization"] = token ? `Bearer ${token}` : "";
  uni.showLoading({
    title: "加载中",
    mask: true,
  });

  return new Promise((resolve, reject) => {
    const params = {
      url: `${config.baseUrl}${url}`,
      data: data || {},
      header: { ...config.header, ...header },
      timeout: config.timeout,
      method: method.toUpperCase(),
      dataType: "json",
    };
    uni.request({
      ...params,
      success: (res) => {
        uni.hideLoading();
        const { statusCode, data } = res;
        if (statusCode == 200) {
          resolve({ ...data, loaded: true, error: false });
        } else if (statusCode == 401) {
          uni.showToast({
            title: "登录态失效",
            icon: "none",
            duration: 3000,
          });
          setTimeout(() => {
            ROUTERS.redirectTo({ url: Pages.LOGIN });
          }, 500);
          reject({ ...data, loaded: true, error: true });
        } else if (statusCode == 403) {
          uni.showToast({
            title: data.message,
            icon: "none",
            duration: 3000,
          });
          setTimeout(() => {
            ROUTERS.redirectTo({ url: Pages.INDEX });
          }, 2000);
          reject({ ...data, loaded: true, error: true });
        } else {
          uni.showToast({
            title: data.message,
            icon: "none",
            duration: 3000,
          });
          console.log("rejected", data);
          reject({ ...data, loaded: true, error: true });
        }
        setTimeout(() => {
          uni.hideLoading();
        }, 3000);
      },
      fail: (res) => {
        console.log("fail------", res);
        reject(res);
        uni.showToast({
          title: res.errMsg,
          icon: "none",
          duration: 3000,
        });
      },
      complete: () => {},
    });
  });
};

export default request;
