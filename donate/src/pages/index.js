import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import NotFound from '../components/NotFound';
import Info from '../components/Info';
import PaymentPage from '../components/Payment';
import SettingsPage from '../components/PersonelInfo';
import { GetProject } from '../api/Project';
import { GetSettings } from '../utilities/LocalSettings';
import { PAGE_STATES } from './page';


const Main = () => {
    const [status, setStatus] = useState({ state: PAGE_STATES.LOADING })
    const [project, setProject] = useState(null);
    const [checkoutInfo, setCheckoutInfo] = useState(null);

    useEffect(() => {
        const GetData = async () => {
            const params = new URLSearchParams(document.location.search);
            const projectId = params.get("p");
            if (projectId) {
                const data = await GetProject(projectId);
                if (!data)
                    return setStatus({ state: PAGE_STATES.NOTFOUND })

                setProject(data);
                const settings = GetSettings();
                if (!settings) {
                    setStatus({ state: PAGE_STATES.SETTINGS });
                }
                else {
                    setStatus({ state: PAGE_STATES.INFO });
                }

            }
            else {
                setStatus({ state: PAGE_STATES.NOTFOUND })
            }
        }
        GetData();
    }, [])
    return <div className='w-screen h-screen flex flex-col bg-gray-100'>
        <div className='flex flex-1'>
            {status.state === PAGE_STATES.LOADING && <Loading />}
            {status.state === PAGE_STATES.NOTFOUND && <NotFound />}
            {status.state === PAGE_STATES.INFO && <Info project={project} />}
            {status.state === PAGE_STATES.SETTINGS && <SettingsPage setCheckout={(info) => { setCheckoutInfo(info) }} onNavigate={(page) => setStatus({ state: page })} onSaveClick={() => { setStatus({ state: PAGE_STATES.INFO }) }} />}
            {status.state === PAGE_STATES.PAYMENT && <PaymentPage projectInfo={project} checkoutInfo={checkoutInfo} GoHome={() => setStatus({ state: PAGE_STATES.INFO })} />}
        </div>
        <Footer />
    </div>
}


export default Main;