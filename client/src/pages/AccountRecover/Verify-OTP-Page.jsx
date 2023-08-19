import React, {Fragment, lazy, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/Lazy-Loader";


const VerifyOTP= lazy(()=>import("../../components/AccountRecovery/Verify-OTP"));

const VerifyOtpPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <VerifyOTP/>
            </Suspense>
        </Fragment>
    );
};

export default VerifyOtpPage;

