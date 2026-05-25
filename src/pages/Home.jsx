import { useEffect, useState } from 'react'
import { getPopularMovies, getRecentMovies } from '../api/tmdb'
import MovieCard from '../components/MovieCard'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [popular, setPopular] = useState([])
  const [recent, setRecent] = useState([])
  const [hero, setHero] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([getPopularMovies(), getRecentMovies()]).then(([pop, rec]) => {
      setPopular(pop)
      setHero(pop[0])
      setRecent(rec)
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0d0d0d' }}>
      <div className="spinner"></div>
    </div>
  )

  return (
    <div className="home">
      {hero && (
        <div
          className="hero"
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${hero.backdrop_path})` }}
        >
          <div className="hero-content">
            <h1>{hero.title}</h1>
            <p>⭐ {hero.vote_average.toFixed(1)}</p>
            <p className="hero-overview">{hero.overview}</p>
            <button onClick={() => navigate(`/movie/${hero.id}`)}>More Info</button>
          </div>
        </div>
      )}

      <div className="section">
        <h2>Δημοφιλείς Ταινίες</h2>
        <div className="grid">
          {popular.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </div>

      <div className="section">
        <h2>Πρόσφατες Ταινίες</h2>
        <div className="grid">
          {recent.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </div>
    </div>
  )
}

export default Home