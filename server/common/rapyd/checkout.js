const MakeRequest = require('./utilities').makeRequest;
const GetExpiration = require('../Expiration');

const CreateCheckoutPage = async ({ paymentAmount, paymentCurrency, buyerCountry, buyerCurrency, customerId, remoteId, ewalletId, lang = "en" }) => {
    let checkoutId = null;

    try {
        const body = {
            "amount": paymentAmount,
            "complete_payment_url": "http://example.com/complete",
            "currency": paymentCurrency,
            "country": buyerCountry,
            "requested_currency": buyerCurrency,
            "error_payment_url": "http://example.com/error",
            "merchant_reference_id": customerId,
            "cardholder_preferred_currency": true,
            "language": lang,
            "metadata": {
                "merchant_defined": true,
                "remoteId": remoteId
            },
            "payment_method_type_categories": [
                "card"
            ],
            "expiration": GetExpiration(1),
            "payment_method_types_exclude": [],
            "ewallets": [
                {
                    "amount": paymentAmount,
                    "ewallet": ewalletId
                }
            ]
        }

        const result = await MakeRequest('POST', '/v1/checkout', body);
        if (result?.body?.status?.status === "SUCCESS")
            checkoutId = result?.body?.data?.id;
    }
    catch (e) {
        global.log(e);
    }

    return checkoutId;
}

module.exports = CreateCheckoutPage;