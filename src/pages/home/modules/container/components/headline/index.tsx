import React, { memo, lazy, Suspense } from 'react';
const Digest = lazy(() => import("./digest"));
const NewsSection = lazy(() => import("./newsSection"));

const Headline = memo(() => {
    return (
        <div className="headline-container">
            <Suspense fallback={<div>loading...</div>}>
                <Digest />
                <NewsSection />
            </Suspense>

        </div>
    )
})

export default Headline;