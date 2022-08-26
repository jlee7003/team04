import React from 'react';
import CardFrame from './UI/CardFrame';
import { AuthContextProvider } from './stores/AuthContext';

const Project = ({ portfolioOwnerId, isEditable }) => {
  return (
    <AuthContextProvider>
      <CardFrame
        portfolioOwnerId={portfolioOwnerId}
        isEditable={isEditable}
        DATA_ENDPOINT={'projects'}
      />
    </AuthContextProvider>
  );
};

export default Project;
