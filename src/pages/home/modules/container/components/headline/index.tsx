import React, { memo } from 'react';
import NewsSection from './newsSection';
import Digest from './digest';
import Popularity from '../popularity';

const Headline = memo(() => {
    return (
        <div className="headline-container">
            <Digest />
            <section className="headline-section">
                <NewsSection />
                {/* <Popularity /> */}
            </section>
        </div>
    )
})

export default Headline;