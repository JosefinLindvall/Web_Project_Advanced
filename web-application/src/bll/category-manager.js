
const categoryRepository = require('../dal/category-repository')

//category-validator for something?

exports.getAllCategories = function (callback) {
    // Validate something here ?? 
    categoryRepository.getAllCategories(callback)
}