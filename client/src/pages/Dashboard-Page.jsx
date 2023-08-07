import React, {Suspense, lazy, Fragment} from 'react';
import LazyLoader from "../components/MasterLayout/Lazy-Loader";

const Dashboard= lazy(()=>import("../components/Dashboard/Dashboard"));

const DashboardPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <Dashboard/>
            </Suspense>
        </Fragment>
    );
};

export default DashboardPage;