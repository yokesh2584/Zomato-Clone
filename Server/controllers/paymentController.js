const PaymentModel = require('../models/paymentModel');
const paytmConfig = require('../config/paytm.config');

class PaymentController {
  async initiatePayment(req, res) {
    const payment = new PaymentModel();
    const params = {
      MID: paytmConfig.MID,
      ORDER_ID: req.body.orderId,
      CUST_ID: req.body.custId,
      TXN_AMOUNT: req.body.amount,
      CHANNEL_ID: paytmConfig.CHANNEL_ID,
      INDUSTRY_TYPE_ID: paytmConfig.INDUSTRY_TYPE_ID,
      WEBSITE: paytmConfig.WEBSITE,
    };

    try {
      const response = await payment.initiatePayment(params);
      res.json(response);
    } catch (error) {
      console.error('Payment Controller Error:', error);
      res.status(500).json({ message: 'Payment failed' });
    }
  }

  async paymentResponse(req, res) {
    const payment = new PaymentModel();
    const checksumReceived = req.body.CHECKSUMHASH;
    const params = {
      ...req.body,
    };
  
    // Verify checksum
    const checksumGenerated = payment.generateChecksum(params);
  
    if (checksumReceived !== checksumGenerated) {
      console.error('Checksum mismatch!');
      res.status(401).json({ message: 'Invalid checksum' });
      return;
    }
  
    // Verify payment status
    const status = req.body.STATUS;
    if (status === 'TXN_SUCCESS') {
      // Payment successful, update order status
      console.log('Payment successful!');
      res.json({ message: 'Payment successful' });
    } else {
      // Payment failed, handle failure
      console.error('Payment failed!');
      res.status(402).json({ message: 'Payment failed' });
    }
  }

}

module.exports = {
  initiatePayment: async (req, res) => {
    const paymentController = new PaymentController();
    paymentController.initiatePayment(req, res);
  },
  paymentResponse: async (req, res) => {
    const paymentController = new PaymentController();
    paymentController.paymentResponse(req, res);
  }
};