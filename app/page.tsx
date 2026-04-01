import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedCities from "@/components/home/FeaturedCities";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedCities />

      {/* How it works */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">어떻게 사용하나요?</h2>
            <p className="text-muted-foreground">단 3단계로 나에게 맞는 도시를 찾으세요</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "조건 설정",
                description: "생활비, 인터넷 속도, 지역 등 원하는 조건을 필터로 설정하세요.",
                emoji: "🔍",
              },
              {
                step: "02",
                title: "도시 비교",
                description: "노마드 점수, 리뷰, 실시간 체류 인원을 한눈에 비교하세요.",
                emoji: "📊",
              },
              {
                step: "03",
                title: "리뷰 확인",
                description: "실제 거주자의 생생한 후기로 의사결정에 확신을 얻으세요.",
                emoji: "✅",
              },
            ].map((item) => (
              <Card key={item.step} className="text-center border-none shadow-sm">
                <CardContent className="pt-8 pb-6">
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <div className="text-sm font-bold text-primary mb-2">STEP {item.step}</div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              지금 바로 시작해보세요
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
              회원가입 없이도 도시 탐색이 가능해요.<br />
              리뷰 작성과 커뮤니티 참여는 무료 가입 후 이용할 수 있습니다.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              {["도시 탐색 무료", "리뷰 읽기 무료", "커뮤니티 참여 무료"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-primary-foreground/90">
                  <CheckCircle className="w-4 h-4" /> {item}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="secondary" size="lg" className="gap-2" render={<Link href="/auth/signup" />}>
                무료로 시작하기 <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                render={<Link href="/cities" />}
              >
                도시 먼저 보기
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
