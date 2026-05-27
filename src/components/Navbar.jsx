import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        <span style={{ fontSize: '1.6rem' }}>🎬</span>
        <span>MovieBox</span>
      </div>
    </nav>
  )
}

export default Navbar