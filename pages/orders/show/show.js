// pages/orders/show/show.js
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
    const page = this;
    const url = app.globalData.url;

    page.setData({
      user_id: app.globalData.userId
      });

    console.log('onLoad user_id', this.data.user_id)

    wx.request({
      url: `${url}orders/${options.id}`,
      // url: `${url}orders/1`,
      method: 'GET',
      success(res) {
        const dishes = res.data.dishes;
        page.setData({
          dishes: dishes,
        });
        console.log("dishes", dishes)
        console.log("nutrients", page.data)
        page.setTotal();
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
  addAmount(e) {
    const page = this;
    const index = e.currentTarget.dataset.id;
    const data2 = page.data
    data2.dishes[index].quantity += 0.5
    page.setData(data2)
    page.setTotal();
  },

  subtractAmount(e) {
    const page = this;
    const index = e.currentTarget.dataset.id;
    const data2 = page.data
    const quantity = data2.dishes[index].quantity
    if (quantity > 0) {
      data2.dishes[index].quantity -= 0.5
      page.setData(data2)
      page.setTotal();
    };
  },

  setTotal() {
    const page = this;
    let calorie = 0;
    let total_fat = 0;
    let sat_fat = 0;
    let cholesterol = 0;
    let sodium = 0;
    let carb = 0;
    let fiber = 0;
    let protein = 0;
    let sugar = 0;
    page.data.dishes.forEach( (dish)  => {
      dish.nutrients.forEach((nutrient) => {
        if (nutrient.name === 'Calories') {
          calorie += nutrient.amount * dish.quantity;
        }
        if (nutrient.name === 'Total Fat') {
          total_fat += nutrient.amount * dish.quantity;
        }
        if (nutrient.name === 'Saturated Fat') {
          sat_fat += nutrient.amount * dish.quantity;
        }
        if (nutrient.name === 'Cholesterol') {
          cholesterol += nutrient.amount * dish.quantity;
        }
        if (nutrient.name === 'Sodium') {
          sodium += nutrient.amount * dish.quantity;
        }
        if (nutrient.name === 'Carbohydrate') {
          carb += nutrient.amount * dish.quantity;
        }
        if (nutrient.name === 'Dietary Fiber') {
          fiber += nutrient.amount * dish.quantity;
        }
        if (nutrient.name === 'Protein') {
          protein += nutrient.amount * dish.quantity;
        }
        if (nutrient.name === 'Sugars') {
          sugar += nutrient.amount * dish.quantity;
        }
      });
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
    console.log('addToMeal user_id', user_id);

    page.data.dishes.forEach((dish) => {
      let dish_id = dish.id;
      let quantity = dish.quantity
      let meal = { quantity: quantity, user_id: user_id, dish_id: dish_id }

      wx.request({
        url: `${url}meals`,
        method: "POST",
        data: meal,
        success(res) {
          console.log(res)
        }
      })
    });

    wx.navigateTo({
      url: `/pages/meals/index/index?toast=true`
    });
  },

  getUserInfo: function (e) {
    const url = app.globalData.url;
    console.log(22, e);
    app.globalData.userInfo = e.detail.userInfo;

    console.log('globalData', app.globalData.userInfo);
    console.log(app.globalData.userInfo)

    const avatarUrl = app.globalData.userInfo.avatarUrl;
    const nickName = app.globalData.userInfo.nickName;
    const id = app.globalData.userId;
    console.log('id', id);
    console.log('avatar', avatarUrl);
    console.log('nickName', nickName);

    const page = this;

    this.setData({
      userInfo: e.detail.userInfo
    });

    wx.request({
      url: `${url}users/${id}`, // static user_id for testing purposes
      method: "PUT",
      data: { profile_image: avatarUrl, username: nickName },
      success() {
        page.addToMeal();
      }
    });
  },

})
