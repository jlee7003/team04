import React, { useState } from 'react';

const AuthContext = React.createContext({
  idList: [],
  setIdList: () => {},
  getIdList: () => {},
  setIsAdding: false,
});

export const AuthContextProvider = (props) => {
  const [idList, setIdList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isAdding,
        setIsAdding,
        idList,
        setIdList,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
