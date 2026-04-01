"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { CityScores } from "@/types";

interface ScoreRadarChartProps {
  scores: CityScores;
  cityName: string;
}

export default function ScoreRadarChart({ scores, cityName }: ScoreRadarChartProps) {
  const data = [
    { subject: "인터넷", value: scores.internet },
    { subject: "카페/코워킹", value: scores.cafe },
    { subject: "생활비", value: scores.cost },
    { subject: "안전도", value: scores.safety },
    { subject: "기후", value: scores.climate },
    { subject: "커뮤니티", value: scores.community },
  ];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data}>
        <PolarGrid className="stroke-border" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
        />
        <Radar
          name={cityName}
          dataKey="value"
          stroke="var(--primary)"
          fill="var(--primary)"
          fillOpacity={0.2}
          strokeWidth={2}
        />
        <Tooltip
          formatter={(value) => [`${value}점`, "점수"]}
          contentStyle={{
            backgroundColor: "var(--popover)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            fontSize: "12px",
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
