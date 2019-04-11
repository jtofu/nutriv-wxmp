// pages/meals/save/save.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    quantity: 1
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const page = this;
    const url = app.globalData.url;
    wx.request({
      url: `${url}dishes/${options.id}`,
      method: 'GET',
      success(res) {
        const dish = res.data;
        page.setData({
          dish: dish
        });
        page.setTotal();
        console.log(11, dish)
      }
    })
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

  addAmount() {
    const page = this;
    let data2 = page.data
    data2.quantity += 1
    page.setData(data2)
    page.setTotal();
    console.log(page.data.dishes);
  },

  subtractAmount(e) {
    const page = this;
    let data2 = page.data
    data2.quantity -= 1
    page.setData(data2)
    page.setTotal();
    console.log(page.data.dishes);
  },

  setTotal() {
    const page = this;
    const dish = page.data.dish;
    let carb = dish.nutrients[0].amount * page.data.quantity;
    let calorie = dish.nutrients[1].amount * page.data.quantity;
    let total_fat = dish.nutrients[2].amount * page.data.quantity;
    let sat_fat = dish.nutrients[3].amount * page.data.quantity;
    let cholesterol = dish.nutrients[4].amount * page.data.quantity;
    let sodium = dish.nutrients[5].amount * page.data.quantity;
    let fiber = dish.nutrients[6].amount * page.data.quantity;
    let sugar = dish.nutrients[7].amount * page.data.quantity;
    let protein = dish.nutrients[8].amount * page.data.quantity;

    page.setData({
      carb: carb,
      calorie: calorie,
      total_fat: total_fat,
      sat_fat: sat_fat,
      cholesterol: cholesterol,
      sodium: sodium,
      fiber: fiber,
      sugar: sugar,
      protein: protein
    });
  },

  addToMeal(e) {
    console.log(e)
    const page = this;
    const url = app.globalData.url;
    let user_id = app.globalData.userId;

    // page.data.dishes.forEach((dish) => {
      let dish_id = page.data.dish.id;
      let quantity = page.data.quantity
      let meal = { quantity: quantity, user_id: user_id, dish_id: dish_id }

      wx.request({
        url: `${url}meals`,
        method: "POST",
        data: meal,
        success(res) {
          console.log(res);
          wx.switchTab({
            url: `/pages/meals/index/index?user_id=${user_id}`
          });
        }
      })
    // });
  },

  // addToMeal(e) {
  //   console.log(e)
  //   const url = app.globalData.url;

  //   let dish_id = e.currentTarget.dataset.id;
  //   let user_id = app.globalData.userId;

  //   let meal = { quantity: 1, user_id: user_id, dish_id: dish_id };

  //   wx.request({
  //     url: `${url}meals`,
  //     method: "POST",
  //     data: meal,
  //     success(res) {
  //       console.log(res)
  //       wx.switchTab({
  //         url: `/pages/meals/index/index?user_id=${user_id}`
  //       })
  //     }
  //   })
  // },
})