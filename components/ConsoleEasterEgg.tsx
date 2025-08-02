"use client";

import { useEffect } from "react";
import { initConsoleEasterEgg } from "@/utils/console-easter-egg";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    initConsoleEasterEgg();
  }, []);

  return null;
}