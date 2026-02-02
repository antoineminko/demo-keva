import React, { lazy, Suspense } from 'react';

const ShowLottie = lazy(() => import('@/components/ui/ShowLottie'));

export const DynamicShowLottie = (props: any) => (
  <Suspense fallback={null}>
    <ShowLottie {...props} />
  </Suspense>
);
