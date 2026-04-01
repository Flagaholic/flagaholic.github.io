'use client';

export default function Home() {
  const handleClick = () => {
    alert('nope');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <b>NoFlag既holic</b>
      <br />
      <img src="/assets2/trollfaceONE.png" alt="Trollface" />
      <br />
      <b>April fools<br />btw that means no website for u tdy</b>
      <br />
      <input
        type="submit"
        value="Click here to turn Music off!"
        onClick={handleClick}
        style={{
          fontFamily: 'Arial',
          fontSize: '25px'
        }}
      />
      <br />
    </div>
  );
}   