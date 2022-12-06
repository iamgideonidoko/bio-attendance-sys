// import FingerprintSigninControl from './lib/fingerprint';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WithMainLayout from './layouts/WithMainLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/staff/Login';
import Register from './pages/staff/Register';
import Profile from './pages/staff/Profile';
import ManageCourses from './pages/staff/ManageCourses';
import ManageStudents from './pages/staff/ManageStudents';
import Settings from './pages/staff/Settings';
import ManageAttendance from './pages/staff/ManageAttendance';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/query-client';
import useStore from './store/store';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import AuthLayout from './layouts/AuthLayout';

function App() {
  useStore();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: '/staff/login',
      element: (
        <AuthLayout routeType="noauth">
          <Login />
        </AuthLayout>
      ),
    },
    {
      path: '/staff/register',
      element: (
        <AuthLayout routeType="noauth">
          <Register />
        </AuthLayout>
      ),
    },
    {
      path: '/staff/profile',
      element: (
        <AuthLayout routeType="auth">
          <Profile />
        </AuthLayout>
      ),
    },
    {
      path: '/staff/manage/courses',
      element: (
        <AuthLayout routeType="auth">
          <ManageCourses />
        </AuthLayout>
      ),
    },
    {
      path: '/staff/manage/attendance',
      element: (
        <AuthLayout routeType="auth">
          <ManageAttendance />
        </AuthLayout>
      ),
    },
    {
      path: '/staff/manage/students',
      element: (
        <AuthLayout routeType="auth">
          <ManageStudents />
        </AuthLayout>
      ),
    },
    {
      path: '/staff/settings',
      element: (
        <AuthLayout routeType="auth">
          <Settings />
        </AuthLayout>
      ),
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
    <QueryClientProvider client={queryClient}>
      <WithMainLayout>
        <RouterProvider router={router} />
      </WithMainLayout>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
