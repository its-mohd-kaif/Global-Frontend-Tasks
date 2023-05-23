import Auth from "./components/auth/Auth";
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from "react";

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
        <Route path="*" element={<Navigate to={'/auth/register'} />} />
      </Routes>
    </>
  );
}

export default App;
