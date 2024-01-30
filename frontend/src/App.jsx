import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';
import Splash from './components/Splash/Splash';
import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import TrackPostCreate from './components/TrackPost/TrackPostCreate';
import TrackShow from './components/trackshow/TrackShow';

import { getCurrentUser } from './store/session';
import FootBar from './components/FootBar/FootBar';

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <FootBar />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <>
            <AuthRoute component={MainPage} />
            <Splash />
          </>
        ),
      },
      {
        path: 'login',
        element: <AuthRoute component={LoginForm} />,
      },
      {
        path: 'signup',
        element: <AuthRoute component={SignupForm} />,
      },
      {
        path: 'createTrackPost',
        element: <TrackPostCreate />,
      },
      {
        path: 'trackShow/1',
        element: <TrackShow/>
      }
    ],
  },
]);

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).finally(() => setLoaded(true));
  }, [dispatch]);

  return loaded && <RouterProvider router={router} />;
}

export default App;
