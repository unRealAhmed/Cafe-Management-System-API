const Category = require('../models/Category')
const asyncHandler = require('../util/asyncHandler');
const AppError = require('../util/appErrors');


//

exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.findAll({ order: [['name', 'ASC']] });
  return res.status(200).json({
    results: categories.length,
    categories
  });
});


exports.addCategory = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { name } = req.body;

  const newCategory = await Category.create({ name });

  res.status(200).json({ message: 'Category added successfully', category: newCategory });
});


exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;

  // Update the category by ID
  await Category.update({ name }, { where: { id } });

  // Find the updated category
  const updatedCategory = await Category.findOne({ where: { id } });

  if (!updatedCategory) {
    return next(new AppError('Category ID not found', 404));
  }

  res.status(200).json({
    message: 'Category updated successfully',
    category: updatedCategory,
  });
});
