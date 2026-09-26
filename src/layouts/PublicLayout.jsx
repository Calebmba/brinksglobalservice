import Navbar from '../components/navigation/Navbar'
import Footer from "../components/footer/Footer";


function PublicLayout({ children }) {
  return (
    <div>
      <Navbar />

      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout