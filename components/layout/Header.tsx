import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b shadow-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="text-primary">Korea</span>
            <span>Nomad</span>
            <Badge variant="secondary" className="text-xs hidden sm:inline-flex">Beta</Badge>
          </Link>

          {/* Desktop Nav */}
          <NavLinks />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" render={<Link href="/auth/login" />}>
                로그인
              </Button>
              <Button size="sm" render={<Link href="/auth/signup" />}>
                무료 시작
              </Button>
            </div>

            {/* Mobile Menu Trigger */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
