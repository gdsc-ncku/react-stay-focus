import React from 'react';

const MdColumn = ({ width = 30, children }) => {
  return (
    <div className="md-layout md-gutter">
      <div className={`md-layout-item md-size-${width}`}>
        {children}
      </div>
    </div>
  );
};

export default MdColumn;
