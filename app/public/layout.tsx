import Navbar from 'app/components/Navbar';

// app/(public)/layout.tsx
export default function PublicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
