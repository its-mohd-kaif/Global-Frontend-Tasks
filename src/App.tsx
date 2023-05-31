import Auth from "./components/auth/Auth";
import { Routes, Route, Navigate, } from 'react-router-dom';
import { Suspense } from "react";
import Panel from "./components/panel/Panel";
import PrepareDashboard from "./components/auth/prepare/PrepareDashboard";
import PrepareOnboarding from "./components/auth/prepare/PrepareOnboarding";

function App() {
  return (
    <>
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
        <Route
          path="/panel/*"
          element={
            <Suspense fallback={<></>}>
              <Panel />
            </Suspense>
          }>
          <Route path="*" element={<>NO Page Found 2</>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
