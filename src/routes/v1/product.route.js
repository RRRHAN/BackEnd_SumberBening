const express = require('express');
const multer = require('multer');
const path = require('path');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { productValidation } = require('../../validations');
const { productController } = require('../../controllers');

const upload = multer();

const router = express.Router();

router.post('/', auth.jwt, upload.any(), validate(productValidation.createProduct), productController.createProduct);
router.put('/:productId', auth.jwt, validate(productValidation.updateProduct), productController.updateProduct);
router.delete('/:productId', auth.jwt, validate(productValidation.deleteProduct), productController.deleteProduct);
router.get('/:productId', auth.jwt, validate(productValidation.getProductById), productController.getProductById);
router.get('/', auth.jwt, validate(productValidation.getProducts), productController.getProducts);
router.use('/image', auth.jwt, express.static(path.join(__dirname, '..', '..', '..', 'data', 'file', 'products')));
router.put(
  '/image/:productId',
  auth.jwt,
  upload.any(),
  validate(productValidation.addProductImages),
  productController.addProductImages
);
router.delete(
  '/image/:productId',
  auth.jwt,
  validate(productValidation.deleteProductImage),
  productController.deleteProductImage
);

module.exports = router;
