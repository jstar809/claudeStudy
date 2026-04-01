"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MapPin } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/cities", label: "도시 탐색" },
  { href: "/community", label: "커뮤니티" },
  { href: "/map", label: "지도" },
  { href: "/my", label: "마이페이지" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <div className="flex flex-col gap-6 mt-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg" onClick={() => setOpen(false)}>
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
              <MapPin className="w-4 h-4" />
            </div>
            <span>KoreaNomad</span>
          </Link>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center py-3 px-3 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 pt-4 border-t">
            <Button variant="outline" render={<Link href="/auth/login" onClick={() => setOpen(false)} />}>
              로그인
            </Button>
            <Button render={<Link href="/auth/signup" onClick={() => setOpen(false)} />}>
              무료 시작하기
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
