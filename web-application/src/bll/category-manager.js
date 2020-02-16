
const categoryRepository = require('../dal/category-repository')


exports.getAllCategories = function (callback) {
    categoryRepository.getAllCategories(callback)
}