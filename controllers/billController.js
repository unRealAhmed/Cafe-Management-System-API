const fs = require('fs');
const { v1: uuidv1 } = require('uuid');
const puppeteer = require('puppeteer');
const path = require('path');
const Bill = require('../models/Bill');
const asyncHandler = require('../util/asyncHandler');
const AppError = require('../util/appErrors');

exports.generateReport = asyncHandler(async (req, res) => {
  const { name, email, paymentMethod, totalAmount, productDetails } = req.body;
  const generatedUUID = uuidv1();
  // console.log(productDetails);
  const productDetailsReport = JSON.parse(productDetails);
  // console.log(productDetailsReport);

  await Bill.create({
    name,
    uuid: generatedUUID,
    email,
    paymentMethod,
    total: totalAmount,
    productDetails,
    createdBy: res.locals.email,
  });

  // Generate PDF using Puppeteer
  const pdfPath = path.join(__dirname, '..', 'pdf', `${generatedUUID}.pdf`);
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const htmlContent = `
  <html>
    <body>
      <h1>Generated PDF</h1>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Payment Method: ${paymentMethod}</p>
      <p>Total Amount: ${totalAmount}</p>
      <h3>Product Details:</h3>
      <ul>
        ${productDetailsReport.map(product => `<li>${product.product} - ${product.price}</li>`).join('')}
      </ul>
    </body>
  </html>
`;
  ;

  await page.setContent(htmlContent);
  await page.pdf({ path: pdfPath, format: 'A4' });

  await browser.close();

  const pdfData = fs.readFileSync(pdfPath);

  // Save to local storage using fs.writeFileSync
  const storagePath = path.join(__dirname, '..', 'pdf', `${generatedUUID}.pdf`);
  fs.writeFileSync(storagePath, pdfData);

  return res.status(200).json({ uuid: generatedUUID, pdfPath: storagePath });
});


exports.getBills = asyncHandler(async (req, res) => {
  const bills = await Bill.findAll({
    order: [['id', 'DESC']],
  });

  res.status(200).json({ data: bills });
});

exports.deleteBill = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedBill = await Bill.findOne({ where: { id } })

  if (!deletedBill) {
    return next(new AppError('Product ID not found', 404))
  }

  await deletedBill.destroy()

  res.status(204).json({ message: 'Bill deleted successfully' });
});