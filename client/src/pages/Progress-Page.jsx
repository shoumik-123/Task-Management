import React, {Fragment, lazy, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/Lazy-Loader";

const Progress= lazy(()=>import("../components/Progress/Progress"));
const ProgressPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <Progress/>
            </Suspense>
        </Fragment>
    );
};

export default ProgressPage;