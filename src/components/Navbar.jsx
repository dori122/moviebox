import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/')
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  const goTopRated = () => {
    navigate('/')
    scrollToMovieSection(0)
  }

  const goNewMovies = () => {
    navigate('/')
    scrollToMovieSection(1)
  }

  const scrollToMovieSection = (sectionIndex) => {
    let tries = 0

    const scroll = () => {
      const sections = document.querySelectorAll('.section')
      const section = sections[sectionIndex]

      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      tries += 1

      if (tries < 20) {
        setTimeout(scroll, 150)
      }
    }

    setTimeout(scroll, 150)
  }

  return (
    <nav
      className="navbar"
      style={{
        justifyContent: 'space-between',
        gap: '24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)'
      }}
    >
      <button
        type="button"
        className="navbar-logo"
        onClick={goHome}
        aria-label="Go to MovieBox home"
        style={{
          background: 'transparent',
          border: 'none',
          padding: 0
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            display: 'grid',
            placeItems: 'center',
            background: '#e50914',
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: 800,
            letterSpacing: '0.5px'
          }}
        >
          MB
        </span>
        <span style={{ lineHeight: 1 }}>MovieBox</span>
      </button>

      <div
        aria-label="Main navigation"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          color: '#d8d8d8',
          fontSize: '0.92rem'
        }}
      >
        <button type="button" onClick={goHome} style={navLinkStyle}>Home</button>
        <button type="button" onClick={goTopRated} style={navLinkStyle}>Top Rated</button>
        <button type="button" onClick={goNewMovies} style={navLinkStyle}>New Movies</button>
      </div>

      <button
        type="button"
        onClick={goTopRated}
        style={{
          background: '#e50914',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          padding: '9px 16px',
          fontWeight: 700,
          cursor: 'pointer'
        }}
      >
        Browse
      </button>
    </nav>
  )
}

const navLinkStyle = {
  background: 'transparent',
  border: 'none',
  color: 'inherit',
  cursor: 'pointer',
  font: 'inherit',
  padding: '6px 0'
}

export default Navbar