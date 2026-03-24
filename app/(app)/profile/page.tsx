import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { logout } from '@/lib/auth/actions'
import { getProfile } from '@/lib/auth/getProfile'

export default async function ProfilePage() {
  const profile = await getProfile()

  return (
    <div className="flex flex-col gap-5 pt-5 pb-20">
      <div className="space-y-1">
        <h1>profile</h1>
        <p className="text-sm text-muted-foreground">Your account details and app identity.</p>
      </div>

      <Card className="gap-0 py-3">
        <CardHeader className="px-3 pb-0">
          <CardTitle className="text-base font-semibold">{profile.username}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-3 pt-3 text-sm">
          <div className="rounded-xl border border-border bg-muted/40 p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Profile id</p>
            <p className="mt-1 break-all font-medium">{profile.id}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted/40 p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Username</p>
            <p className="mt-1 font-medium">{profile.username}</p>
          </div>
          <form action={logout}>
            <Button type="submit" variant="destructive" className="w-full uppercase">
              log out
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
