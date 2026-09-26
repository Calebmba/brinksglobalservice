import bgImage from '../assets/brinks-bg.jpg';
import TrackShipmentsCard from '../components/home/TrackShipmentsCard';
import LoginCard from '../components/home/LoginCard';

function Home() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
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

      {/* Normal-flow content that scrolls over the background */}
      <div
        style={{
          position: 'absolute',
          top: '80px', // clears the fixed navbar (adjust to match NAVBAR_HEIGHT)
          bottom: '40px',
          right: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <TrackShipmentsCard />
        <LoginCard />
      </div>
    </div>
  );
}

export default Home;