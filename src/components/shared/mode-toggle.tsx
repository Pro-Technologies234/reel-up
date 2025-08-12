'use client';

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  // const [mounted, setMounted] = React.useState(false);

  // React.useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) {
  //   // Avoid hydration mismatch
  //   return null;
  // }

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  // Determine actual theme in case of "system"
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <Button onClick={toggleTheme} variant="outline" size="icon" className="cursor-pointer">
      {theme === "system" ? (
        <Monitor className="h-[1.2rem] w-[1.2rem]" />
      ) : currentTheme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
