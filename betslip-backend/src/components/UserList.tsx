/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { RelayEnvironmentProvider, useLazyLoadQuery, graphql } from 'react-relay';
import { UserListQuery } from '@/__generated__/UserListQuery.graphql'; 
import { RelayEnvironment } from '@/RelayEnvironment';

const UserQuery = graphql`
  query UserListQuery {
    users {
      id
      name
      email
    }
  }
`;

const UserList = () => {
  const data = useLazyLoadQuery<UserListQuery>(UserQuery, {}); 

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Users</h2>
      <ul>
        {data.users.map((user: any) => (
          <li key={user.id} className="border p-2 rounded my-2">
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function UserListWithProvider() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <UserList />
    </RelayEnvironmentProvider>
  );
}
