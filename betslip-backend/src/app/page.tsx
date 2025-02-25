import UserListWithProvider from '../components/UserList';

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Next.js + Relay + GraphQL Yoga</h1>
      <UserListWithProvider />
    </div>
  );
}
