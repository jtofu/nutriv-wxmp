// pages/meals/new/new.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    array: [],
    index: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // SET TODAY'S DATE
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);

    this.setData({
      currentDateNoFormat: currentDate,
      currentDate: formattedDate,
    });

    const url = app.globalData.url;
    const userId = app.globalData.userId;
    const page = this;
    console.log(11,userId);
    wx.request({
      url: `${url}dishes`,
      method: 'GET',
      success(res) {
        console.log(res.data);
        page.setData(res.data);
        page.setMealsRecommended();
      }
    });

    wx.request({
      url: `${url}goals?user_id=${userId}`,
      method: 'GET',
      success(res) {
        console.log(res.data);
        const goals = res.data.goals;
        const data2 = page.data;
        const array = data2.array;
        goals.forEach((goal) => {
          array.push(goal.name);
          page.setData(data2);
          console.log(page.data.array)
        });
        page.setData({
          goals:goals
        });
      }
    });

    wx.request({
      url: `${url}meals?user_id=${userId}`,
      method: 'GET',
      success(res) {
        console.log(res.data);
        const meals = res.data.meals;
        const mealsToday = []
        meals.forEach((meal) => {
          let mealDate = page.formatDate(new Date(meal.date));
          meal.date = mealDate
          if (mealDate === page.data.currentDate) {
            mealsToday.push(meal);
            console.log(33, meal);
          }
        })
        page.setData({
          mealsToday: mealsToday
        });
        console.log('meals', mealsToday);
        page.setTotal();
      }
    });
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

  addNewMeal() {
    wx.navigateTo({
      url: '/pages/meals/add/add',
    })
  },

  scanQrCode() {
    // Allow scanning from camera only
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res);
        wx.navigateTo({
          url: "/"+res.path,
        })
      }
    })
  },

  mealMoreInfo(e) {
    const url = app.globalData.url;

    let dish_id = e.currentTarget.dataset.id;
    let user_id = app.globalData.userId;

    wx.navigateTo({
      url: `/pages/meals/save/save?id=${dish_id}`
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.setMealsRecommended();
  },

  setTotal() {
    const page = this;
    let carb = 0;
    let calorie = 0;
    let total_fat = 0;
    let sat_fat = 0;
    let cholesterol = 0;
    let sodium = 0;
    let fiber = 0;
    let sugar = 0;
    let protein = 0;
    page.data.mealsToday.forEach((dish) => {
      carb += dish.nutrients[0].amount * dish.quantity
      calorie += dish.nutrients[1].amount * dish.quantity
      total_fat += dish.nutrients[2].amount * dish.quantity
      sat_fat += dish.nutrients[3].amount * dish.quantity
      cholesterol += dish.nutrients[4].amount * dish.quantity
      sodium += dish.nutrients[5].amount * dish.quantity
      fiber += dish.nutrients[6].amount * dish.quantity
      sugar += dish.nutrients[7].amount * dish.quantity
      protein += dish.nutrients[8].amount * dish.quantity
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

  formatDate(currentDate) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = currentDate.getDate();
    var monthIndex = currentDate.getMonth();
    var year = currentDate.getFullYear();

    // return monthNames[monthIndex] + ' ' + year;
    return `${monthNames[monthIndex]} ${day}, ${year}`
  },

  setMealsRecommended() {
    const page = this;
    const mealsRecommended = [];
    let current_intake = 0
    const goal_amount = page.data.goals[page.data.index].amount;
    page.data.mealsToday.forEach((dish) => {
      dish.nutrients.forEach((nutrient) => {
        if (nutrient.name === page.data.array[page.data.index]) {
          current_intake += nutrient.amount;
        };
      });
    });

    page.data.dishes.forEach((dish) => {
      dish.nutrients.forEach((nutrient) => {
        if ((nutrient.name === page.data.array[page.data.index]) && (nutrient.amount <= goal_amount - current_intake)) {
          mealsRecommended.push(dish);
        }
      });
    });

    page.setData({
      mealsRecommended: mealsRecommended
    })
  }
})