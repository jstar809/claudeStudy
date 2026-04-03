"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold mb-2">문제가 발생했어요</h2>
      <p className="text-muted-foreground mb-8 max-w-sm">
        일시적인 오류입니다. 아래 버튼을 눌러 다시 시도해보세요.
      </p>
      <Button onClick={reset}>다시 시도</Button>
    </div>
  );
}
