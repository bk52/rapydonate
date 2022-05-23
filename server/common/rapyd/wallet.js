const MakeRequest = require('./utilities').makeRequest;

const CreatePerson = (firstName = "", lastName = "", email = "", ewalletRefId = "", phone = "") => {
    return {
        first_name: firstName,
        last_name: lastName,
        email: email,
        ewallet_reference_id: ewalletRefId,
        phone_number: phone,
        type: "person",
    }
}

const CreateContact = (name = "", adress = "", city = "", state = "", country = "", zip = "", date_of_birth = "") => {
    return {
        contact_type: "personal",
        address: {
            name: name,
            line_1: adress,
            city: city,
            state: state,
            country: country,
            zip: zip,
            metadata: {},
        },
        date_of_birth: date_of_birth,
        metadata: {
            "merchant_defined": true
        }
    }
}

const CreateWallet = async (person, contact) => {
    let walletId = null;
    try {
        const body = {
            ...person,
            ...contact,
            metadata: {
                "merchant_defined": true
            },
        }

        const result = await MakeRequest('POST', '/v1/user', body);
        if (result?.body?.status?.status === "SUCCESS")
            walletId = result?.body?.data?.id;
    }
    catch (e) {
        global.log(e);
    }
    return walletId;
}

const DeleteWallet = async (walletId) => {
    let res = false;
    try {
        const result = await MakeRequest('DELETE', `/v1/user/${walletId}`);
        if (result?.body?.status?.status === "SUCCESS")
            res = true;
    }
    catch (e) {
        global.log(e);
    }
    return res;
}

module.exports = {
    CreatePerson,
    CreateContact,
    CreateWallet,
    DeleteWallet
};