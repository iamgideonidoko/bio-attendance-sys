// import FingerprintSigninControl from './lib/fingerprint';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WithMainLayout from './lib/WithMainLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/admin/AdminLogin';
import AdminRegister from './pages/admin/AdminRegister';
import StaffLogin from './pages/staff/StaffLogin';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: '/admin/login',
      element: <AdminLogin />,
    },
    {
      path: '/admin/register',
      element: <AdminRegister />,
    },
    {
      path: '/staff/login',
      element: <StaffLogin />,
    },
  ]);

  // useEffect(() => {
  //   (async () => {
  //     console.log('test');
  //     const fingerprintSigninControl = new FingerprintSigninControl();
  //     await fingerprintSigninControl.init();
  //   })();
  // }, []);

  return (
    <WithMainLayout>
      <RouterProvider router={router} />
    </WithMainLayout>
  );
}

export default App;
