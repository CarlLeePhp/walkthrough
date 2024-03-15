import { createBrowserRouter } from 'react-router-dom';

import App from '../layout/App';
import WalkthroughPage from '../../features/walkthrough/WalkthroughPage';
import DepartmentPage from '../../features/department/DepartmentPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <WalkthroughPage /> },
            { path: 'department', element: <DepartmentPage /> }
        ]
    }
])