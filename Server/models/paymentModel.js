const axios = require("axios");
const crypto = require("crypto");
const paytmConfig = require("../config/paytm.config");

class PaymentModel {
  generateChecksum(params) {
    const mergedParams = { ...params, ...paytmConfig };
    const sortedParams = Object.keys(mergedParams)
      .sort()
      .reduce((acc, key) => {
        acc[key] = mergedParams[key];
        return acc;
      }, {});

    const checksumString = Object.values(sortedParams).join("|");
    const checksum = crypto
      .createHash("sha256")
      .update(checksumString)
      .digest("hex");

    return checksum;
  }

  async initiatePayment(params) {
    const checksum = this.generateChecksum(params);

    const paymentUrl = "https://securegw.paytm.in/theia/paytmGateway";
    const headers = {
      "Content-Type": "application/json",
    };

    const paymentRequest = {
      ...params,
      CHECKSUMHASH: checksum,
    };

    try {
      const response = await axios.post(paymentUrl, paymentRequest, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("Paytm Payment Error:", error);
      throw error;
    }
  }
}

module.exports = PaymentModel;
