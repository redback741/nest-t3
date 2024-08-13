import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <nav className="flex h-[60px] w-full items-center justify-between">
      <h1 className="pl-3">哒哒清单</h1>
      <div className="flex items-center gap-2 pr-3">
        <UserButton />
        <ThemeToggle />
      </div>
    </nav>
  )
}