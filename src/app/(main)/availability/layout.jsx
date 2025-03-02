import React, { Suspense } from "react";

const AvailabilityLayout = ({ children }) => {
  return (
    <div className="mx-auto">
      <Suspense fallback={<div>loading...</div>}>{children}</Suspense>
    </div>
  );
};

export default AvailabilityLayout;
