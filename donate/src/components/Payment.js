import React, { useEffect, useState } from "react";
import { GetSettings } from "../utilities/LocalSettings";
import LoadingPage from "./Loading";
import ErrorPage from "./Error";
import PaymentSuccessPage from "./PaymentSuccess";
import { SendDonation } from "../api/Donation";

const PAYMENT_STATUS = {
    Active: 'ACT',
    Redirect: 'RED',
    Error: 'ERROR',
    Success: 'SUCCESS'
}

const Payment = ({ checkoutInfo, projectInfo, GoHome }) => {
    const [loading, setLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState({ status: PAYMENT_STATUS.Active, message: '' })
    useEffect(() => {
        if (checkoutInfo?.checkoutId !== '') {
            try {
                let chkPage = new RapydCheckoutToolkit({
                    pay_button_text: "Pay Now",
                    pay_button_color: "#4BB4D2",
                    id: checkoutInfo.checkoutId,
                    style: {
                        submit: {
                            base: {
                                color: "white"
                            }
                        }
                    }
                });
                chkPage.displayCheckout();
                setLoading(false);
            }
            catch (e) {
                console.error(e);
            }
        }
    }, [checkoutInfo?.checkoutId])

    const paymentFeedback = async (e) => {
        if (e.detail.error) {
            setPaymentStatus({ status: PAYMENT_STATUS.Error, message: e.detail.error })
        }
        else {
            const localSettings = GetSettings();
            await SendDonation(
                projectInfo._id,
                checkoutInfo.donateId,
                'rapydonate',
                localSettings.username,
                checkoutInfo.message
            )
            setPaymentStatus({ status: PAYMENT_STATUS.Success, message: 'Thank you for your donation 👏' })
        }
    }

    useEffect(() => {
        window.addEventListener('onCheckoutPaymentSuccess', paymentFeedback);
        window.addEventListener('onCheckoutFailure', paymentFeedback);
        window.addEventListener('onCheckoutPaymentFailure', paymentFeedback);
        return () => {
            window.removeEventListener('onCheckoutPaymentSuccess', paymentFeedback);
            window.removeEventListener('onCheckoutFailure', paymentFeedback);
            window.removeEventListener('onCheckoutPaymentFailure', paymentFeedback);
        };

    }, [])

    return <div className='flex flex-col justify-center w-full h-full'>
        <div className='max-w-4xl h-full bg-white'>
            {
                paymentStatus.status === PAYMENT_STATUS.Error && <ErrorPage title='We cannot process your payment' description={paymentStatus.message} onContinueClick={() => GoHome()} />
            }
            {
                paymentStatus.status === PAYMENT_STATUS.Success && <PaymentSuccessPage projectInfo={projectInfo} message={paymentStatus.message} onContinueClick={() => GoHome()} />
            }
            {
                paymentStatus.status === PAYMENT_STATUS.Active && <>
                    {loading && <LoadingPage />}
                    <div className={`${loading ? 'hidden' : ''}`} id="rapyd-checkout"></div>
                </>
            }
        </div>
    </div>
}

export default Payment;