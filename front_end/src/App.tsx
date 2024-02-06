import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { publicRoutes } from "@/routes/MainRoutes";
import { protectedRoutes } from "@/routes/ProtectRoutes";
import { Fragment, Suspense } from 'react';
import { ThemeProvider } from "@/components/themes/ThemeProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import './i18n';

function App() {
  const { token } = useSelector((state: any) => state.Auth);
  return (

    <ThemeProvider>
      <div className='App'>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          limit={1}
        />
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {publicRoutes.map((route: any, index: number) => {
                const Page = route.component;
                const Layout = route.layout;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              })}
              {protectedRoutes.map((route: any, index: number) => {
                const Page = route.component;
                const Layout = route.layout;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      token !== "" ? (
                        <Layout>
                          <Page />
                        </Layout>
                      ) : (
                        <Navigate to="/login" replace={true} />
                      )
                    }
                  />
                );
              })}
            </Routes>
          </Suspense>
        </Router >
      </div>
    </ThemeProvider>
  );
}

export default App;