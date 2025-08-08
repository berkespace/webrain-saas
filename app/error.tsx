"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-md text-center">
            <h2 className="text-2xl font-bold mb-2">Bir şeyler ters gitti</h2>
            <p className="text-muted-foreground mb-4">Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.</p>
            <Button onClick={() => reset()}>Tekrar Dene</Button>
          </div>
        </div>
      </body>
    </html>
  )
}
