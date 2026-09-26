import bgImage from '../assets/brinks-bg.jpg';
import TrackShipmentsCard from '../components/home/TrackShipmentsCard';
import LoginCard from '../components/home/LoginCard';

function Home() {
  return (
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
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '80px', // clears the fixed navbar (adjust to match NAVBAR_HEIGHT)
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