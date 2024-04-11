import React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core'; // Assuming you're using Material-UI for the card components

const SharedCard = ({ header, media, actions, children }) => {
  return (
    <Card style={{borderRadius: '4px'}}>
      {header && 
        
        <CardHeader className={card-header} title={header}>
          <div id="logo-div"><img alt="logo" src="../images/logo-red.png" /></div>
        </CardHeader>
        }
      
      {media && 
        {media}
        }
        
      
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWithLogo;
