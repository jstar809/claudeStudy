"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

const scoreCategories = [
  { key: "internet", label: "인터넷", emoji: "📡" },
  { key: "cafe", label: "카페/코워킹", emoji: "☕" },
  { key: "cost", label: "생활비", emoji: "💵" },
  { key: "safety", label: "안전도", emoji: "👮" },
  { key: "climate", label: "기후", emoji: "🌤" },
  { key: "community", label: "커뮤니티", emoji: "🤝" },
];

const stayOptions = ["1주 미만", "1~4주", "1~3개월", "3개월+"];
const jobTypes = ["개발자", "디자이너", "마케터", "작가", "크리에이터", "기타"];
const seasons = ["봄", "여름", "가을", "겨울"];

function StarSelector({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          className={`text-xl transition-colors ${
            i <= (hovered || value) ? "text-amber-400" : "text-muted-foreground/30"
          }`}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(i)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ReviewForm({ cityName }: { cityName: string }) {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [stayDuration, setStayDuration] = useState("");
  const [jobType, setJobType] = useState("");
  const [season, setSeason] = useState("");
  const [body, setBody] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && tagInput.trim() && tags.length < 5) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {cityName} 리뷰 작성
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Scores */}
        <div>
          <p className="text-sm font-medium mb-3">카테고리별 평가</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {scoreCategories.map((cat) => (
              <div key={cat.key} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm flex items-center gap-2">
                  <span>{cat.emoji}</span> {cat.label}
                </span>
                <StarSelector
                  value={scores[cat.key] || 0}
                  onChange={(v) => setScores((prev) => ({ ...prev, [cat.key]: v }))}
                />
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Text Review */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            리뷰 작성 <span className="text-muted-foreground font-normal">(최소 50자)</span>
          </label>
          <textarea
            className="w-full min-h-[120px] p-3 rounded-md border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="실제 체류 경험을 자세히 작성해 주세요. 인터넷 환경, 카페 분위기, 생활비 등 구체적인 정보가 도움이 됩니다."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <div className="text-right text-xs text-muted-foreground mt-1">
            {body.length} / 50자 이상
          </div>
        </div>

        {/* Meta info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium mb-2">체류 기간</p>
            <div className="flex flex-col gap-1.5">
              {stayOptions.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant={stayDuration === opt ? "default" : "outline"}
                  size="sm"
                  className="justify-start h-8 text-xs"
                  onClick={() => setStayDuration(opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">직업 유형</p>
            <div className="flex flex-col gap-1.5">
              {jobTypes.map((j) => (
                <Button
                  key={j}
                  type="button"
                  variant={jobType === j ? "default" : "outline"}
                  size="sm"
                  className="justify-start h-8 text-xs"
                  onClick={() => setJobType(j)}
                >
                  {j}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">추천 계절</p>
            <div className="flex flex-col gap-1.5">
              {seasons.map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant={season === s ? "default" : "outline"}
                  size="sm"
                  className="justify-start h-8 text-xs"
                  onClick={() => setSeason(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div>
          <p className="text-sm font-medium mb-2">해시태그 <span className="text-muted-foreground font-normal">(최대 5개, Enter로 추가)</span></p>
          <input
            type="text"
            className="w-full p-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="예: 카페작업최적, 인터넷빠름, 바다뷰"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
            disabled={tags.length >= 5}
          />
          {tags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  #{tag}
                  <button type="button" onClick={() => setTags((prev) => prev.filter((t) => t !== tag))}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Button className="w-full" size="lg">
          리뷰 등록하기
        </Button>
      </CardContent>
    </Card>
  );
}
