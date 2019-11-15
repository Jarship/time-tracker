import React from 'react';

function Panel ({ children, ...otherProps }) {
  return (
    <section className="Panel" {...otherProps}>
      {children}
    </section>
  )
};

export default Panel;