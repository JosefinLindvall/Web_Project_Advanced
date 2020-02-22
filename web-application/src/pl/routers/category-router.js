const categoryManager = require('../../bll/category-manager')



exports.getAllCategories = function (callback) {
    categoryManager.getAllCategories(callback)
}