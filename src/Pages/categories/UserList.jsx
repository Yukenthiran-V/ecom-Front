import React, { Suspense, useState } from "react";


// Lazy load the component
// const LazyComponent = React.lazy(() => import('./LazyComponent'));

export default function App() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(true)}>Load Component</button>
      {show && (
        <Suspense fallback={<p>Loading...</p>}>
          {/* <LazyComponent /> */}
        </Suspense>
      )}
    </> 
  );
}
