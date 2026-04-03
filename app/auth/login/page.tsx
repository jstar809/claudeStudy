'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setError('')
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        setError(error.message)
        return
      }

      router.push('/')
      router.refresh()
    } catch (e) {
      setError('오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl mb-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground">
              <MapPin className="w-5 h-5" />
            </div>
            KoreaNomad
          </Link>
          <p className="text-sm text-muted-foreground">다시 오셨군요! 로그인하세요.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-lg">로그인</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1.5 block">이메일</label>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium">비밀번호</label>
                  <Link href="/auth/reset-password" className="text-xs text-primary hover:underline">
                    비밀번호 찾기
                  </Link>
                </div>
                <Input
                  type="password"
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button className="w-full" onClick={handleLogin} disabled={loading}>
                {loading ? '로그인 중...' : '로그인'}
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              계정이 없으신가요?{' '}
              <Link href="/auth/signup" className="text-primary font-medium hover:underline">
                회원가입
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
