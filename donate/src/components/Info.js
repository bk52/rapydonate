import React, { useEffect, useState } from 'react';
import { GetSettings } from '../utilities/LocalSettings';
import { GetCheckoutId } from "../api/Checkout";
import { GetPaymentMethods } from "../api/PaymentMethods";
import DonateButton from "../components/DonateButton";
import { PAGE_STATES } from '../pages/page';

const Info = ({ project, onNavigate, setCheckout }) => {
    const [donate, setDonate] = useState(null);
    const [methods, setMethods] = useState([]);

    const onDonateClick = (id) => {
        const filtered = project.donationTypes.filter(item => item._id === id)[0];
        let selectedDonate = { ...filtered, paymentMethod: '-' };
        setDonate(selectedDonate);
    }


    const onPaymentClick = async (e) => {
        if (donate.paymentMethod == '-')
            return alert('Please select a payment method');

        const localSettings = GetSettings();
        setLoading(true);
        const checkoutId = await GetCheckoutId(
            project._id,
            donate._id,
            localSettings.countryCode,
            localSettings.countryCurrency,
            donate.paymentMethod
        )

        if (checkoutId) {
            setCheckout({ checkoutId, donateId: donate._id, message: donate.message, status: 'ACT' });
            onNavigate(PAGE_STATES.PAYMENT);
        }
    }

    useEffect(() => {
        const GetData = async () => {
            const localSettings = GetSettings();
            console.log(localSettings);
            if (localSettings) {
                const paymentData = await GetPaymentMethods(localSettings.countryCode);
                console.log(paymentData);
                let selectPaymentData = [{ title: 'Select payment method', value: '-' }, ...paymentData];
                setMethods(selectPaymentData);
                setLoading(false);
            }
            else {
                onNavigate(PAGE_STATES.SETTINGS);
            }
        }
        GetData();
    }, [])


    return <div className='flex justify-center w-full h-full'>
        <div className='max-w-4xl h-full bg-white'>
            {
                project?.imageURL != '' && <img src={project?.imageURL} className='w-full h-52 object-cover' />
            }
            <div className="w-full text-xl text-center mt-2 text-gray-800 font-bold">{project?.title}</div>
            {
                donate ? <>
                    <div className="flex flex-col items-center px-2">
                        <div className="w-full text-lg mt-6 text-center text-gray-700">{donate.title}</div>
                        <div className="w-full text-xl mt-4 text-center text-black font-bold">{donate.price} $</div>
                        {donate.donateType === 'message' && <input name="message" onChange={(e) => { setDonate(prevState => ({ ...prevState, 'message': e.target.value })) }} value={donate.message} className="p-2 w-full mt-4 text-gray-400 border-none focus:ring-0" placeholder="Max. 180 character" maxlength="180" />}
                        <select value={donate?.paymentMethod} onChange={(e) => { setDonate(prevState => ({ ...prevState, 'paymentMethod': e.target.value })) }} name="paymentMethod" className="p-2 w-48 mt-2 text-gray-400 border-none focus:ring-0">
                            {
                                methods.map((item, index) => {
                                    return <option key={index} value={item.value}>{item.title}</option>
                                })
                            }
                        </select>
                        <div className="flex">
                            <div onClick={onPaymentClick} className="w-24 p-2 text-center cursor-pointer bg-white shadow-md rounded-sm mt-6 text-gray-400 hover:text-gray-600">Continue</div>
                            <div onClick={(e) => { setDonate(null) }} className="w-24 p-2 text-center cursor-pointer bg-white shadow-md rounded-sm mt-6 text-red-400 hover:text-red-600">Back</div>
                        </div>
                    </div>
                </> : <>
                    <div className="w-full text-lg mt-1 text-gray-400 px-2">{project.description}</div>
                    <div className="flex flex-row w-full mt-4 justify-evenly">
                        {project.donationTypes.map(item => item.active && <DonateButton id={item._id} icon={item.icon} tooltip={item.title} onDonateClick={onDonateClick} />)}
                    </div>
                </>
            }
        </div>
    </div>
}

export default Info;