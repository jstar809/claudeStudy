import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Users, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: MapPin,
    value: "47개",
    label: "등록된 도시",
    description: "제주부터 군산까지",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Star,
    value: "1,247개",
    label: "사용자 리뷰",
    description: "실제 체류자 평가",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Users,
    value: "162명",
    label: "현재 체류 노마드",
    description: "실시간 체크인 현황",
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    icon: TrendingUp,
    value: "5,000+",
    label: "월간 방문자",
    description: "빠르게 성장 중",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="text-center border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bg} mb-3`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm font-medium mb-0.5">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
