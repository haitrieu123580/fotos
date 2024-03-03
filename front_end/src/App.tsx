import "./App.css";
import './i18n';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "@/components/themes/ThemeProvider";
import { ToastContainer } from 'react-toastify';
import RouterProvider from "@/routes/RouterProvider";
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallbackRenderer from "@/components/common/error-fallback-render/ErrorFallbackRenderer";
import initStore from '@/redux/store';
const store = initStore()

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary fallbackRender={ErrorFallbackRenderer}>
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
            <RouterProvider />
          </div>
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;