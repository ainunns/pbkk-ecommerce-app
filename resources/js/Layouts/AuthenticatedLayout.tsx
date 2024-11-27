import { type PropsWithChildren, type ReactNode } from "react";
import Navbar from "./Navbar";

export default function Authenticated({
  header,
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {header && (
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}

      <main>{children}</main>
    </div>
  );
}
