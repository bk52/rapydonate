const MakeRequest = require('./utilities').makeRequest;

const CreatePerson = () => {
    return {
        first_name: "",
        last_name: "",
        email: "",
        ewallet_reference_id: "",
        phone_number: "",
        type: "person",
    }
}

const CreateContact = () => {
    return {
        phone_number: "",
        email: "",
        first_name: "",
        last_name: "",
        mothers_name: "",
        contact_type: "personal",
        address: {
            name: "",
            line_1: "",
            line_2: "",
            line_3: "",
            city: "",
            state: "",
            country: "",
            zip: "",
            phone_number: "",
            metadata: {},
            canton: "",
            district: ""
        },
        identification_type: "",
        identification_number: "",
        date_of_birth: "",
        country: "",
        nationality: "",
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
        const result = await MakeRequest('DELETE', `/v1/user/${walletId}`, {});
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