"use client";

import { useEffect } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    const originalClasses = "antialiased flex flex-col min-h-screen";
    if (document.body.className !== originalClasses) {
      document.body.className = originalClasses;
    }
  }, []);

  return <>{children}</>;
}
