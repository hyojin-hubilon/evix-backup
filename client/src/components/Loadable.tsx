import { LazyExoticComponent, ReactNode, Suspense } from 'react';

// project import
import Loader from './Loader';
import { JSX } from 'react/jsx-runtime';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable =
    (Component: LazyExoticComponent<() => ReactNode>) => (props: JSX.IntrinsicAttributes) =>
        (
            <Suspense fallback={<Loader />}>
                <Component {...props} />
            </Suspense>
        );

export default Loadable;
