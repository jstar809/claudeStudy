import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-6xl mb-4">🗺️</div>
      <h1 className="text-3xl font-bold mb-2">페이지를 찾을 수 없어요</h1>
      <p className="text-muted-foreground mb-8 max-w-sm">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있어요.
      </p>
      <div className="flex gap-3">
        <Button render={<Link href="/" />}>홈으로</Button>
        <Button variant="outline" render={<Link href="/cities" />}>
          <MapPin className="w-4 h-4" />
          도시 탐색
        </Button>
      </div>
    </div>
  );
}
