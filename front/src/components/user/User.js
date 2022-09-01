import React, { useState, useEffect } from 'react';
import UserEditForm from './UserEditForm';
import UserCard from './UserCard';
import * as Api from '../../api';

function User({ portfolioOwnerId, isEditable, setIsEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    Api.get('users', portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  return (
    <>
      {isEditing ? (
        <UserEditForm
          user={user}
          setIsEditing={setIsEditing}
          setUser={setUser}
        />
      ) : (
        <UserCard
          user={user}
          setIsEditing={setIsEditing}
          setIsEditable={setIsEditable}
          isEditable={isEditable}
          portfolioOwnerId={portfolioOwnerId}
        />
      )}
    </>
  );
}

export default User;
