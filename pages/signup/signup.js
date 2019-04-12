// pages/signup/signup.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  getUserInfo: function (e) {
    const url = app.globalData.url;
    console.log(22, e);
    app.globalData.userInfo = e.detail.userInfo;
    console.log('globalData', app.globalData.userInfo);
    // console.log(app.globalData.userInfo)

    const avatarUrl = app.globalData.userInfo.avatarUrl;
    const nickName = app.globalData.userInfo.nickName;
    const id = app.globalData.userId;
    console.log('id', id);
    console.log('avatar', avatarUrl);
    console.log('nickName', nickName);

    this.setData({
      userInfo: e.detail.userInfo
    });

    wx.request({
      url: `${url}users/${id}`, // static user_id for testing purposes
      method: "PUT",
      data: { profile_image: avatarUrl, username: nickName },
      success() {
        wx.navigateTo({
          url: '../meals/index/index'
        })
      }
    });
  },

})
