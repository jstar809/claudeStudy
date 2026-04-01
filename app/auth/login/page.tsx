import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl mb-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground">
              <MapPin className="w-5 h-5" />
            </div>
            KoreaNomad
          </Link>
          <p className="text-sm text-muted-foreground">다시 오셨군요! 로그인하세요.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-lg">로그인</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Social login */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full gap-2">
                <span className="text-lg">🟡</span>
                카카오로 계속하기
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <span className="text-lg">🔵</span>
                구글로 계속하기
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">또는</span>
              <Separator className="flex-1" />
            </div>

            {/* Email login */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1.5 block">이메일</label>
                <Input type="email" placeholder="example@email.com" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium">비밀번호</label>
                  <Link href="/auth/reset-password" className="text-xs text-primary hover:underline">
                    비밀번호 찾기
                  </Link>
                </div>
                <Input type="password" placeholder="비밀번호 입력" />
              </div>
              <Button className="w-full">로그인</Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              계정이 없으신가요?{" "}
              <Link href="/auth/signup" className="text-primary font-medium hover:underline">
                회원가입
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
