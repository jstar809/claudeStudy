import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { checkinStats } from "@/lib/mock-data";
import { MessageSquare, CalendarDays, Users, ArrowRight, MapPin } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">커뮤니티</h1>
        <p className="text-muted-foreground">같은 도시의 노마드와 연결되어 정보를 나눠보세요.</p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Card className="border-2 hover:border-primary transition-colors group">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold mb-1">Q&A 게시판</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  도시별 숙소, 카페, 교통 등 궁금한 것을 물어보세요. 경험자가 답해드립니다.
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary">질문 128개</Badge>
                  <Badge variant="secondary">답변 384개</Badge>
                </div>
                <Button className="gap-1.5" render={<Link href="/community/qa" />}>
                  게시판 보기 <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary transition-colors group">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-green-50 text-green-600 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <CalendarDays className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold mb-1">밋업</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  같은 도시에 있는 노마드를 직접 만나보세요. 네트워킹과 정보 공유의 장.
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary">이번달 12개</Badge>
                  <Badge variant="secondary">전국 진행 중</Badge>
                </div>
                <Button className="gap-1.5" render={<Link href="/community/meetup" />}>
                  밋업 보기 <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="mb-10" />

      {/* Real-time checkin */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <h2 className="text-xl font-bold">지금 여기 있어요 — 실시간 현황</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {checkinStats.map((stat, idx) => (
            <Card key={stat.cityName} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">{stat.count}</div>
                <div className="text-sm font-medium">{stat.cityName}</div>
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
                  <Users className="w-3 h-3" /> 명 체류
                </div>
                <Badge variant="outline" className="text-xs mt-2">#{idx + 1}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" className="gap-2">
            <MapPin className="w-4 h-4" />
            내 체류 도시 체크인하기
          </Button>
        </div>
      </div>
    </div>
  );
}
