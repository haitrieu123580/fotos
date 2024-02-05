import "./App.css";
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { publicRoutes } from "@/routes/MainRoutes";
import { protectedRoutes } from "@/routes/ProtectRoutes";
import {  Suspense } from 'react';
import initStore from '@/redux/store';
const store = initStore()

function App() {
  return (
    <Provider store={store}>
    <div className='App'>
      <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              { publicRoutes.map((route:any, index:number) => {
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
            {protectedRoutes.map((route:any, index:number) => {
              const Page = route.component;
              const Layout = route.layout;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    0 ? (
                      <Layout>
                        <Page/>
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
    </Provider >
  );
}

export default App;