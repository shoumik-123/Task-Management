import React, {Fragment, lazy, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/Lazy-Loader";


const SendOTP= lazy(()=>import("../../components/AccountRecovery/Send-OTP"));

const SendOtpPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <SendOTP/>
            </Suspense>
        </Fragment>
    );
};

export default SendOtpPage;

