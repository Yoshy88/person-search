import UserSearch from './components/user-search';
import { UserDialog } from './components/user-dialog';
import { auth } from '@/auth';
import { signInWithGoogle, signOutUser } from './actions/actions';

export default async function Home({ searchParams }: { searchParams: Promise<{ userId?: string }> }) {
  const session = await auth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Search</h1>
      <div className="mb-8 rounded-lg border bg-card p-4 text-card-foreground">
        {session?.user ? (
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm">
              Connecte en tant que <span className="font-medium">{session.user.email ?? session.user.name ?? 'Utilisateur'}</span>
            </p>
            <form action={signOutUser}>
              <button type="submit" className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:opacity-90">
                Se deconnecter
              </button>
            </form>
          </div>
        ) : (
          <form action={signInWithGoogle}>
            <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              Se connecter avec Google
            </button>
          </form>
        )}
      </div>
      <UserSearch searchParams={searchParams} />
      <UserDialog />

    </div>
  );
}
