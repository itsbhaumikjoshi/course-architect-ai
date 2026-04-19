import React from 'react';
import { Fab } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { fabStyle } from '../../styles/contents/ContentStyles';

const EnhanceButton: React.FC = () => {
  return (
    <Fab 
      variant="extended" 
      sx={fabStyle}
      onClick={() => console.log('Enhance clicked!')}
    >
      <AutoAwesomeIcon sx={{ mr: 1 }} />
      Enhance Course
    </Fab>
  );
};

export default EnhanceButton;
