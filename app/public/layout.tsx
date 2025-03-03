// app/(public)/layout.tsx
export default function PublicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="bg-gray-200 p-4">
        <div className="container mx-auto">Public Navigation</div>
      </nav>
      {children}
    </>
  );
}
