import Link from "next/link";
import { MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-3">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary text-primary-foreground">
                <MapPin className="w-4 h-4" />
              </div>
              <span>KoreaNomad</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              대한민국 디지털 노마드를 위한 도시 탐색 & 커뮤니티 평가 플랫폼
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm mb-3">탐색</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/cities" className="hover:text-foreground transition-colors">도시 탐색</Link></li>
              <li><Link href="/map" className="hover:text-foreground transition-colors">지도 보기</Link></li>
              <li><Link href="/cities?sort=cost" className="hover:text-foreground transition-colors">생활비 랭킹</Link></li>
              <li><Link href="/cities?sort=hot" className="hover:text-foreground transition-colors">이번달 핫플</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">커뮤니티</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/community/qa" className="hover:text-foreground transition-colors">Q&A 게시판</Link></li>
              <li><Link href="/community/meetup" className="hover:text-foreground transition-colors">밋업</Link></li>
              <li><Link href="/my/reviews" className="hover:text-foreground transition-colors">내 리뷰</Link></li>
              <li><Link href="/my/favorites" className="hover:text-foreground transition-colors">즐겨찾기</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">서비스</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">소개</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">프리미엄</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">도시 데이터 제보</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">문의하기</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 KoreaNomad. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground transition-colors">이용약관</Link>
            <Link href="#" className="hover:text-foreground transition-colors">개인정보처리방침</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
