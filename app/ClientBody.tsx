"use client";

import { useEffect } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes and attributes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    const originalClasses = "antialiased flex flex-col min-h-screen";
    
    // Reset body classes
    if (document.body.className !== originalClasses) {
      document.body.className = originalClasses;
    }
    
    // Remove common extension-added attributes
    const attributesToRemove = [
      'inmaintabuse',
      'cz-shortcut-listen',
      'data-new-gr-c-s-check-loaded',
      'data-gr-ext-installed',
      'spellcheck'
    ];
    
    attributesToRemove.forEach(attr => {
      if (document.body.hasAttribute(attr)) {
        document.body.removeAttribute(attr);
      }
    });
  }, []);

  return <>{children}</>;
}
