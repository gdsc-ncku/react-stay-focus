import React, { useContext, useMemo } from 'react';
import './SharedCard.css'; // Import your CSS file for styling
import { Switch, Button, Card, Badge } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import PropTypes from 'prop-types';

const SharedCard = ({ header, extra, actions, children }) => {
  return (
    <Card style={{borderRadius: '4px'}}>
      {header && 
        <CardHeader className="header" title={header} />
        }
      
      {extra && 
        {extra}
        }
        
      
      <CardContent className="content">{children}</CardContent>
      
      {/* Actions 插槽 */}
      {actions && 
        <CardActions className="actions">{actions}</CardActions>
        }
    </Card>
  );
};

export default SharedCard;
