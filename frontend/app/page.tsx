import Link from 'next/link';
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col font-sans">
      
      <div className="max-w-6xl mx-auto w-full px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="MoneyLog Logo" className="h-20"/>
        </div>
      </div>

      <div className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto w-full px-6 grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="max-w-xl z-10">
            <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-900/30 rounded-full border border-emerald-900/50">
              Simple Finance
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white mb-6">
              Master your money, <br/>
              <span className="text-emerald-400">effortlessly.</span>
            </h1>
            
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Stop stressing over spreadsheets. MoneyLog helps you track expenses and manage wallets. All in one place, with zero hassle.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/dashboard" className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-emerald-900/20">
                Start Tracking
              </Link>
              <Link href="/signup" className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-colors border border-slate-700">
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-slate-600">
          <p>&copy; {new Date().getFullYear()} MoneyLog. Built with care.</p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;