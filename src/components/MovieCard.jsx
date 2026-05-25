import { useNavigate } from 'react-router-dom'
import { getPosterUrl } from '../api/tmdb'

function MovieCard({ movie }) {
  const navigate = useNavigate()

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
      <div className="poster-wrapper">
        <img src={getPosterUrl(movie.poster_path)} alt={movie.title} />
        <div className="rating">⭐ {movie.vote_average.toFixed(1)}</div>
      </div>
      <p className="movie-title">{movie.title}</p>
      <p className="movie-year">{movie.release_date?.slice(0, 4)}</p>
    </div>
  )
}

export default MovieCard