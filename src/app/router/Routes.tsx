import { createBrowserRouter } from 'react-router-dom';

import App from '../layout/App';
import WalkthroughPage from '../../features/walkthrough/WalkthroughPage';
import DepartmentPage from '../../features/department/DepartmentPage';
import WalkthroughBack from '../../features/walkthrough/WalkthroughBack';
import ProcedurePage from '../../features/procedure/ProcedurePage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <WalkthroughPage /> },
            { path: 'department', element: <DepartmentPage /> },
            { path: 'backs', element: <WalkthroughBack /> },
            { path: 'procedure', element: <ProcedurePage /> }
        ]
    }
])