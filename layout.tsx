
import './globals.css'
export const metadata = { title: 'Freesolar — Portail Solaire', description: 'Inscription, éligibilité, uploads, signature (stub).' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gradient-to-b from-yellow-50 to-white text-gray-800 min-h-screen">
        <header className="border-b border-[#0A2342] bg-white/70 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" className="w-10 h-10 rounded-xl" alt="Freesolar"/>
              <div className="font-semibold">Freesolar</div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#FFC300] text-[#0A2342] border border-[#0A2342]">Installateurs RGE partenaires</span>
            </div>
            <a href="tel:+33123456789" className="btn btn-primary">📞 01 23 45 67 89</a>
          </div>
        </header>
        {children}
        <footer className="mt-12 border-t border-[#0A2342]">
          <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-[#0A2342]/80">© 2025 Freesolar — Mentions légales · Politique de confidentialité</div>
        </footer>
      </body>
    </html>
  )
}
