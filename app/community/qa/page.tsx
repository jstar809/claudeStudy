import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { qaPost } from "@/lib/mock-data";
import { MessageSquare, CheckCircle, Eye, Plus, Search } from "lucide-react";

const categories = ["전체", "숙소", "카페", "교통", "비용", "기타"];

const categoryColors: Record<string, string> = {
  숙소: "bg-blue-100 text-blue-700",
  카페: "bg-amber-100 text-amber-700",
  교통: "bg-green-100 text-green-700",
  비용: "bg-purple-100 text-purple-700",
  기타: "bg-gray-100 text-gray-700",
};

export default function QAPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Q&A 게시판</h1>
          <p className="text-muted-foreground text-sm">도시 생활에 관한 질문을 올려보세요.</p>
        </div>
        <Button className="gap-1.5 shrink-0">
          <Plus className="w-4 h-4" />
          질문하기
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="질문 검색..." className="pl-9" />
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={cat === "전체" ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Post list */}
      <div className="space-y-3">
        {qaPost.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  {post.isAdopted ? (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[post.category]}`}>
                      {post.category}
                    </span>
                    <Badge variant="outline" className="text-xs h-5">{post.cityName}</Badge>
                    {post.isAdopted && (
                      <Badge className="text-xs h-5 bg-green-500">채택완료</Badge>
                    )}
                  </div>

                  <h3 className="font-medium text-sm leading-snug mb-2 line-clamp-2">
                    {post.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{post.userNickname}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> 답변 {post.answerCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {post.viewCount}
                    </span>
                    <span>{post.createdAt}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load more */}
      <div className="text-center mt-6">
        <Button variant="outline">더 보기</Button>
      </div>
    </div>
  );
}
