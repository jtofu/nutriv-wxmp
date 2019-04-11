// pages/goals/new/new.js
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

  formSubmit: function (event) {
    let nutrient_id = parseInt(event.detail.value.nutrient);
    let amount = parseInt(event.detail.value.amount);
    // let description = event.detail.value.description
    // let price_per_hour = event.detail.value.price_per_hour
    // let location = event.detail.value.location
    let user_id = app.globalData.userId
    // let image = this.data.photoUrl
    // let category = event.detail.value.category

    let goal = { nutrient_id: nutrient_id, user_id: user_id, amount: amount }

    const url = app.globalData.url;
    const id = app.globalData.userId;
    wx.request({
      url: `${url}goals`,
      method: "POST",
      data: goal,
      success(res) {
        // const id = res.data.id
        wx.reLaunch({
          url: `/pages/users/show/show?id=${id}`
        });
      }
    });
  },
})