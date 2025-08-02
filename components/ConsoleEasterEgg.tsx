"use client";

import { useEffect, useState } from "react";
import { initConsoleEasterEgg } from "@/utils/console-easter-egg";

export default function ConsoleEasterEgg() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    initConsoleEasterEgg();
  }, [mounted]);

  return null;
}