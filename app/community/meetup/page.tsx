import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { meetups } from "@/lib/mock-data";
import { CalendarDays, MapPin, Users, Plus, Clock } from "lucide-react";

export default function MeetupPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">밋업</h1>
          <p className="text-muted-foreground text-sm">같은 도시의 노마드를 직접 만나보세요.</p>
        </div>
        <Button className="gap-1.5 shrink-0">
          <Plus className="w-4 h-4" />
          밋업 개설
        </Button>
      </div>

      {/* This month banner */}
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-5 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <CalendarDays className="w-5 h-5 text-primary" />
          <span className="font-semibold">2026년 4월 예정 밋업</span>
        </div>
        <p className="text-sm text-muted-foreground">
          이번 달 전국 12개 밋업이 예정되어 있습니다. 관심 있는 밋업에 참여 신청하세요.
        </p>
      </div>

      {/* Meetup cards */}
      <div className="space-y-4">
        {meetups.map((meetup) => {
          const participationRate = (meetup.currentParticipants / meetup.maxParticipants) * 100;
          const isFull = meetup.currentParticipants >= meetup.maxParticipants;

          return (
            <Card key={meetup.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <Badge variant="outline" className="text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        {meetup.cityName}
                      </Badge>
                      {isFull && <Badge variant="destructive" className="text-xs">마감</Badge>}
                      {!isFull && participationRate >= 70 && (
                        <Badge className="text-xs bg-orange-500">마감 임박</Badge>
                      )}
                    </div>

                    <h3 className="font-bold text-base mb-1">{meetup.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {meetup.description}
                    </p>

                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {meetup.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {meetup.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {meetup.location}
                      </span>
                    </div>

                    <div className="flex gap-1 flex-wrap mb-3">
                      {meetup.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">#{tag}</Badge>
                      ))}
                    </div>

                    {/* Participation bar */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Users className="w-3.5 h-3.5" />
                          {meetup.currentParticipants} / {meetup.maxParticipants}명
                        </span>
                        <span className={isFull ? "text-destructive" : "text-muted-foreground"}>
                          {isFull ? "마감" : `${meetup.maxParticipants - meetup.currentParticipants}자리 남음`}
                        </span>
                      </div>
                      <Progress value={participationRate} className="h-1.5" />
                    </div>
                  </div>

                  <div className="shrink-0">
                    <Button
                      size="sm"
                      variant={isFull ? "outline" : "default"}
                      disabled={isFull}
                      className="w-24"
                    >
                      {isFull ? "마감됨" : "참여 신청"}
                    </Button>
                    <div className="text-xs text-center text-muted-foreground mt-1.5">
                      {meetup.organizerNickname}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <Button variant="outline">더 보기</Button>
      </div>
    </div>
  );
}
