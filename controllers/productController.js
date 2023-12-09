const Product = require('../models/Product');
const Category = require('../models/Category');
const asyncHandler = require('../util/asyncHandler');
const AppError = require('../util/appErrors');



exports.createProduct = asyncHandler(async (req, res, next) => {
  const { name, categoryID, description, price } = req.body;

  if (!name || !categoryID || !price) {
    return next(new AppError('Name, category ID, and price are required.', 400));
  }

  const category = await Category.findByPk(categoryID);
  if (!category) {
    return next(new AppError('Category not found', 404));
  }

  const newProduct = await Product.create({
    name,
    categoryID,
    description,
    price,
    status: 'true',
  });

  res.status(200).json({ message: 'Product added successfully', product: newProduct });
});


exports.getProducts = asyncHandler(async (req, res, next) => {

  const products = await Product.findAll({
    attributes: ['id', 'name', 'description', 'price', 'status'],
    include: [
      {
        model: Category,
        attributes: ['name'],
      },
    ],
  });
  res.status(200).json({ data: products });
});


exports.getProductById = async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByPk(id, {
    attributes: ['id', 'name', 'description', 'price'],
  });

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json({ data: product });

};

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { name, categoryID, description, price } = req.body;
  const { id } = req.params
  await Product.update(
    {
      name,
      categoryID,
      description,
      price,
    },
    {
      where: { id },
    }
  );

  const updatedProduct = await Product.findOne({
    where: { id },
  });

  if (!updatedProduct) {
    return next(new AppError('Product ID not found', 404));
  }

  res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
});

// DELETE PRODUCT
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedProduct = await Product.findOne({
    where: { id },
  });

  if (!deletedProduct) {
    return next(new AppError('Product ID not found', 404));
  }

  await deletedProduct.destroy();

  res.status(204).json({
    message: 'Product deleted successfully',
  });
});