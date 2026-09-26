import bgImage from '../assets/brinks-bg.jpg';
import TrackShipmentsCard from '../components/home/TrackShipmentsCard';
import LoginCard from '../components/home/LoginCard';

function Home() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Fixed background layer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
        }}
      />

      {/* Content in normal flow, cards pushed to top-right */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingTop: '80px', // clears the fixed navbar
          paddingRight: '32px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginBottom: '120px', // now actually reserves scroll space before the footer
          }}
        >
          <TrackShipmentsCard />
          <LoginCard />
        </div>
      </div>
    </div>
  );
}

export default Home;