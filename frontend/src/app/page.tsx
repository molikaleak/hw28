export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
      <main className="flex flex-col items-center justify-center gap-8 w-full max-w-3xl border border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 bg-white dark:bg-zinc-900 shadow-sm">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Frontend is working! 🚀
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-lg">
            This is the Next.js frontend for the CI/CD assignment. It will be deployed to Vercel/Netlify.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
          <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 flex flex-col gap-2">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Frontend Status</h2>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Deployed & Accessible</span>
            </div>
          </div>
          
          <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 flex flex-col gap-2">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Backend Status</h2>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Deployed independently via Render/Railway</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
