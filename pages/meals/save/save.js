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
    data2.quantity += 0.5
    page.setData(data2)
    page.setTotal();
  },

  subtractAmount(e) {
    const page = this;
    let data2 = page.data
    if (data2.quantity > 0) {
      data2.quantity -= 0.5
      page.setData(data2)
      page.setTotal();
    };
  },

  setTotal() {
    const page = this;
    const dish = page.data.dish;
    let calorie = 0;
    let total_fat = 0;
    let sat_fat = 0;
    let cholesterol = 0;
    let sodium = 0;
    let carb = 0;
    let fiber = 0;
    let protein = 0;
    let sugar = 0;

    dish.nutrients.forEach((nutrient) => {
      if (nutrient.name === 'Calories') {
        calorie += nutrient.amount * page.data.quantity;
      }
      if (nutrient.name === 'Total Fat') {
        total_fat += nutrient.amount * page.data.quantity;
      }
      if (nutrient.name === 'Saturated Fat') {
        sat_fat += nutrient.amount * page.data.quantity;
      }
      if (nutrient.name === 'Cholesterol') {
        cholesterol += nutrient.amount * page.data.quantity;
      }
      if (nutrient.name === 'Sodium') {
        sodium += nutrient.amount * page.data.quantity;
      }
      if (nutrient.name === 'Carbohydrate') {
        carb += nutrient.amount * page.data.quantity;
      }
      if (nutrient.name === 'Dietary Fiber') {
        fiber += nutrient.amount * page.data.quantity;
      }
      if (nutrient.name === 'Protein') {
        protein += nutrient.amount * page.data.quantity;
      }
      if (nutrient.name === 'Sugars') {
        sugar += nutrient.amount * page.data.quantity;
      }
    });

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
    let dish_id = page.data.dish.id;
    let quantity = page.data.quantity
    let meal = { quantity: quantity, user_id: user_id, dish_id: dish_id }

    wx.request({
      url: `${url}meals`,
      method: "POST",
      data: meal,
      success(res) {
        console.log(res);
        wx.navigateTo({
          url: `/pages/meals/index/index?user_id=${user_id}`
        });
      }
    });
  }
})
