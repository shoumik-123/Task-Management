import React, {Fragment, lazy, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/Lazy-Loader";


const CreatePassword= lazy(()=>import("../../components/AccountRecovery/Create-Password"));

const CreatePasswordPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <CreatePassword/>
            </Suspense>
        </Fragment>
    );
};

export default CreatePasswordPage;
