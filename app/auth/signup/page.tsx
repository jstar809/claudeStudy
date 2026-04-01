import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MapPin, CheckCircle } from "lucide-react";

const jobTypes = ["개발자", "디자이너", "마케터", "작가", "크리에이터", "기타"];

export default function SignupPage() {
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
          <p className="text-sm text-muted-foreground">노마드 커뮤니티에 합류하세요.</p>
        </div>

        {/* Free badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {["무료 가입", "리뷰 작성", "커뮤니티 참여"].map((item) => (
            <span key={item} className="flex items-center gap-1 text-xs text-muted-foreground">
              <CheckCircle className="w-3.5 h-3.5 text-green-500" /> {item}
            </span>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-lg">회원가입</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Social signup */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full gap-2">
                <span className="text-lg">🟡</span>
                카카오로 시작하기
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <span className="text-lg">🔵</span>
                구글로 시작하기
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">또는</span>
              <Separator className="flex-1" />
            </div>

            {/* Email signup */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1.5 block">이메일</label>
                <Input type="email" placeholder="example@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">닉네임</label>
                <Input placeholder="사용할 닉네임 입력" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">비밀번호</label>
                <Input type="password" placeholder="8자 이상 입력" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  직업 유형 <span className="text-muted-foreground font-normal">(선택)</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {jobTypes.map((job) => (
                    <Badge
                      key={job}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                    >
                      {job}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button className="w-full">가입하기</Button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              가입 시{" "}
              <Link href="#" className="text-primary hover:underline">이용약관</Link>
              {" "}및{" "}
              <Link href="#" className="text-primary hover:underline">개인정보처리방침</Link>
              에 동의하게 됩니다.
            </p>

            <p className="text-center text-sm text-muted-foreground">
              이미 계정이 있으신가요?{" "}
              <Link href="/auth/login" className="text-primary font-medium hover:underline">
                로그인
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
