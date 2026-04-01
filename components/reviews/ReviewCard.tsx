import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, ThumbsDown, Flag } from "lucide-react";
import type { Review } from "@/types";

interface ReviewCardProps {
  review: Review;
}

const scoreLabels = {
  internet: "인터넷",
  cafe: "카페/코워킹",
  cost: "생활비",
  safety: "안전도",
  climate: "기후",
  community: "커뮤니티",
};

function StarRow({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= score ? "text-amber-400" : "text-muted"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const avgScore =
    Math.round(
      (Object.values(review.scores).reduce((a, b) => a + b, 0) /
        Object.values(review.scores).length) *
        10
    ) / 10;

  return (
    <Card>
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                {review.userNickname.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{review.userNickname}</span>
                <Badge variant="outline" className="text-xs h-5">{review.userJobType}</Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <span>체류: {review.stayDuration}</span>
                <span>·</span>
                <span>{review.season} 방문</span>
                <span>·</span>
                <span>{review.createdAt}</span>
              </div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xl font-bold text-primary">{avgScore}</div>
            <div className="text-xs text-muted-foreground">종합</div>
          </div>
        </div>

        {/* Score Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4 p-3 bg-muted/30 rounded-lg">
          {(Object.entries(review.scores) as [keyof typeof scoreLabels, number][]).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{scoreLabels[key]}</span>
              <StarRow score={val} />
            </div>
          ))}
        </div>

        {/* Body */}
        <p className="text-sm leading-relaxed text-muted-foreground mb-3">{review.body}</p>

        {/* Tags */}
        {review.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap mb-4">
            {review.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">#{tag}</Badge>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs">
              <ThumbsUp className="w-3.5 h-3.5" />
              도움됐어요 {review.helpfulCount}
            </Button>
            <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs text-muted-foreground">
              <ThumbsDown className="w-3.5 h-3.5" />
              별로예요
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs text-muted-foreground">
            <Flag className="w-3.5 h-3.5" />
            신고
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
