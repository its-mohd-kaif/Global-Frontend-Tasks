import Auth from "./components/auth/Auth";
import { Routes, Route, Navigate, } from 'react-router-dom';
import React, { Suspense, Component, ReactNode, ErrorInfo, useState } from "react";
import Panel from "./components/panel/Panel";
import PrepareDashboard from "./components/auth/prepare/PrepareDashboard";
import PrepareOnboarding from "./components/auth/prepare/PrepareOnboarding";
import { Toast, ToastWrapper } from "@cedcommerce/ounce-ui";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "./redux/ReduxSlice";
import Response from "./components/panel/onboarding/response/Response";
import BrokenComponent from "./components/panel/utility/commonComponent/BrokenComponent";


interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <FallbackComponent />;
    }

    return this.props.children;
  }
}

const FallbackComponent: React.FC = () => (
  <>
    <BrokenComponent />
  </>
);


function App() {
  const redux: any = useSelector((redux: any) => redux.redux)
  return (
    <ErrorBoundary>
      <React.Fragment>
        <Routes>
          <Route
            path="/auth/*"
            element={
              <Suspense fallback={<></>}>
                <Auth />
              </Suspense>
            }>
          </Route>
          <Route path="*" element={<Navigate to={'/auth/login'} />} />
          <Route path='/prepareOnboarding' element={<PrepareOnboarding />} />
          <Route path='/prepareDashboard' element={<PrepareDashboard />} />
          <Route path="/show/message" element={<Response />} />
          <Route
            path="/panel/:uId"
            element={
              <Suspense fallback={<></>}>
                <Panel />
              </Suspense>
            }>
            <Route path="*" element={<>NO Page Found 2</>} />
          </Route>
        </Routes>
        <>
          {redux.toast.type !== "" && redux.toast.message !== "" ?
            <RenderToasts type={redux.toast.type} message={redux.toast.message} /> : null
          }
        </>
      </React.Fragment>
    </ErrorBoundary>
  );
}

export default App;

const RenderToasts = (props: any) => {
  const { type, message } = props
  const dispatch = useDispatch()
  let time = 5000;
  const words = message.split(' ').join('_').split('_');
  const wordLimit = words.length % 20 === 1 ? 0 : 1;
  const perWord: any = parseInt((words.length / 20).toFixed(0));
  time = (perWord + wordLimit) * 5000;
  return (
    <ToastWrapper>
      <Toast
        message={message}
        onDismiss={() => { dispatch(hideToast()) }}
        timeout={time}
        type={type}
      />
    </ToastWrapper>
  );
}
