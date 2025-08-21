// BEFORE: export default function AuthLayout({ title, subtitle, children }){
export default function AuthLayout({ title, subtitle, children, noCard = false }){
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">Q</div>
            <span className="text-white/90 font-semibold tracking-wide">QNNEX</span>
          </div>
          {/* no nav on auth pages */}
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-stretch py-10 md:py-16">
          {title && (
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-sm">{title}</h1>
              {subtitle && <p className="text-white/80 mt-2">{subtitle}</p>}
            </div>
          )}
          <div className="grid place-items-center">
            {noCard ? (
              <div className="w-full">{children}</div>
            ) : (
              <div className="card w-full max-w-lg p-6 md:p-8">{children}</div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
