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

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: '/staff/login',
      element: <Login />,
    },
    {
      path: '/staff/register',
      element: <Register />,
    },
    {
      path: '/staff/profile',
      element: <Profile />,
    },
    {
      path: '/staff/manage/courses',
      element: <ManageCourses />,
    },
    {
      path: '/staff/manage/attendance',
      element: <ManageAttendance />,
    },
    {
      path: '/staff/manage/students',
      element: <ManageStudents />,
    },
    {
      path: '/staff/settings',
      element: <Settings />,
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
