export default function OfflinePage() {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Hors ligne — Coach Bluewave</title>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #f8fafc;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
          }
          .card {
            background: white;
            border-radius: 20px;
            padding: 48px 32px;
            text-align: center;
            max-width: 380px;
            width: 100%;
            box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          }
          .icon {
            width: 72px;
            height: 72px;
            background: #eff6ff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
          }
          h1 { font-size: 1.5rem; font-weight: 700; color: #1e293b; margin-bottom: 12px; }
          p { color: #64748b; line-height: 1.6; margin-bottom: 32px; }
          a {
            display: inline-block;
            background: #2563eb;
            color: white;
            text-decoration: none;
            padding: 14px 32px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 0.95rem;
          }
        `}</style>
      </head>
      <body>
        <div className="card">
          <div className="icon">
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <h1>Vous êtes hors ligne</h1>
          <p>Vérifiez votre connexion internet et réessayez. Les pages déjà visitées restent disponibles.</p>
          <a href="/portal">Réessayer</a>
        </div>
      </body>
    </html>
  );
}
