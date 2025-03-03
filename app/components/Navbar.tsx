// app/components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/public">
          <h1 className="text-xl font-bold">Market Motors</h1>
        </Link>
        <Link href="/api/auth/signin" className="text-blue-500 hover:underline">
          Log In
        </Link>
      </div>
    </nav>
  );
}
