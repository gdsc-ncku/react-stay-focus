import React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core'; // Assuming you're using Material-UI for the card components

const CardWithLogo = ({ children }) => {
  return (
    <Card style={{ maxWidth: '40%', margin: 'auto', position: 'relative', top: '40px', textAlign: 'center' }}>
      <CardHeader className="card-header">
        <div id="logo-div"><img alt="logo" src="../images/logo-red.png" /></div>
        {children.header}
      </CardHeader>
      {children.media && <div>{children.media}</div>}
      <CardContent>
        {children.content}
      </CardContent>
    </Card>
  );
};

export default CardWithLogo;
