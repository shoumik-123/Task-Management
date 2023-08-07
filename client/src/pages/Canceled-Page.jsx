import React, {Fragment, lazy, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/Lazy-Loader";

const Canceled= lazy(()=>import("../components/Canceled/Canceled"));
const CanceledPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <Canceled/>
            </Suspense>
        </Fragment>
    );
};

export default CanceledPage;