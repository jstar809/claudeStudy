"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Users, TrendingUp, type LucideIcon } from "lucide-react";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { cities } from "@/lib/mock-data";

const totalReviews = cities.reduce((sum, c) => sum + c.reviewCount, 0);
const totalNomads = cities.reduce((sum, c) => sum + c.currentNomads, 0);

const statConfigs = [
  {
    icon: MapPin,
    target: cities.length,
    suffix: "개",
    label: "등록된 도시",
    description: "제주부터 군산까지",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950",
  },
  {
    icon: Star,
    target: totalReviews,
    suffix: "개",
    label: "사용자 리뷰",
    description: "실제 체류자 평가",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950",
  },
  {
    icon: Users,
    target: totalNomads,
    suffix: "명",
    label: "현재 체류 노마드",
    description: "실시간 체크인 현황",
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-950",
  },
  {
    icon: TrendingUp,
    target: 5000,
    suffix: "+",
    label: "월간 방문자",
    description: "빠르게 성장 중",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950",
  },
];

interface AnimatedStatCardProps {
  icon: LucideIcon;
  target: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
  bg: string;
}

function AnimatedStatCard({ icon: Icon, target, suffix, label, description, color, bg }: AnimatedStatCardProps) {
  const count = useCounterAnimation(target);

  return (
    <Card className="text-center border-none shadow-sm">
      <CardContent className="pt-6">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bg} mb-3`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div className="text-2xl sm:text-3xl font-bold mb-1">
          {count.toLocaleString()}{suffix}
        </div>
        <div className="text-sm font-medium mb-0.5">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </CardContent>
    </Card>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statConfigs.map((stat) => (
            <AnimatedStatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
