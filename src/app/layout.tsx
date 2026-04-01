export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* not audio */}
        <iframe
          src="/assets2/silence.mp3"
          allow="autoplay"
          id="audio"
          style={{ display: 'none' }}
        ></iframe>

        {/* trololololo lololo lololo yeyeyeyeye dididididi */}
        <audio autoPlay loop>
          <source src="/assets2/trololo.ogg" type="audio/ogg" />
          <source src="/assets2/trololo.mp3" type="audio/mpeg" />
        </audio>

        {/* Bg image */}
        <div style={{
          fontFamily: 'Arial',
          color: 'white',
          fontSize: '50px',
          backgroundImage: 'url(/assets2/bg.png)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          {children}
        </div>
      </body>
    </html>
  );
}