import { useParams, useNavigate } from 'react-router-dom'
import { getMovieDetails, getPosterUrl } from '../api/tmdb'
import { useEffect, useState } from 'react'

const BACKDROP_BASE = 'https://image.tmdb.org/t/p/original'
const PROFILE_BASE  = 'https://image.tmdb.org/t/p/w185'

function MovieDetail() {
  const { id }      = useParams()
  const navigate    = useNavigate()
  const [movie, setMovie]       = useState(null)
  const [loaded, setLoaded]     = useState(false)
  const [imgReady, setImgReady] = useState(false)

  useEffect(() => {
    setLoaded(false)
    setImgReady(false)
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=el-GR&append_to_response=credits`,
      { headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` } }
    )
      .then(r => r.json())
      .then(d => { setMovie(d); setLoaded(true) })
  }, [id])

  if (!loaded) return (
    <div className="detail-loading">
      <span className="detail-spinner" />
    </div>
  )

  const director = movie.credits?.crew?.find(c => c.job === 'Director')
  const cast     = movie.credits?.cast?.slice(0, 7) ?? []
  const genres   = movie.genres?.map(g => g.name) ?? []
  const runtime  = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}ω ${movie.runtime % 60}λ`
    : null
  const year     = movie.release_date?.slice(0, 4)
  const score    = movie.vote_average?.toFixed(1)
  const arc      = (parseFloat(score) / 10) * 188.5

  return (
    <div className="detail-shell">
      {movie.backdrop_path && (
        <div
          className="detail-bg"
          style={{ backgroundImage: `url(${BACKDROP_BASE}${movie.backdrop_path})` }}
        />
      )}
      <div className="detail-vignette" />
      <button className="detail-back" onClick={() => navigate(-1)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Πίσω
      </button>
      <div className="detail-wrap">
        <div className={`detail-left ${imgReady ? 'detail-left--in' : ''}`}>
          <div className="detail-poster-shell">
            {movie.poster_path
              ? <img src={getPosterUrl(movie.poster_path)} alt={movie.title} onLoad={() => setImgReady(true)} />
              : <div className="detail-poster-ph">🎬</div>
            }
          </div>
          <div className="detail-score-ring">
            <svg viewBox="0 0 72 72" width="72" height="72">
              <circle cx="36" cy="36" r="30" className="detail-ring-bg" />
              <circle cx="36" cy="36" r="30" className="detail-ring-fill"
                strokeDasharray={`${arc} 188.5`} transform="rotate(-90 36 36)" />
            </svg>
            <span className="detail-score-num">{score}</span>
          </div>
        </div>
        <div className="detail-right">
          <div className="detail-meta-row">
            {year     && <span className="detail-pill">{year}</span>}
            {runtime  && <span className="detail-pill">{runtime}</span>}
            {movie.original_language && <span className="detail-pill">{movie.original_language.toUpperCase()}</span>}
          </div>
          <h1 className="detail-title">{movie.title}</h1>
          {movie.original_title !== movie.title && <p className="detail-orig">{movie.original_title}</p>}
          <div className="detail-genres">
            {genres.map(g => <span key={g} className="detail-genre">{g}</span>)}
          </div>
          {director && (
            <p className="detail-director">
              <span className="detail-label">Σκηνοθεσία</span>
              {director.name}
            </p>
          )}
          {movie.overview && <p className="detail-overview">{movie.overview}</p>}
          {cast.length > 0 && (
            <div className="detail-cast-wrap">
              <span className="detail-label" style={{ marginBottom: '12px' }}>Πρωταγωνιστές</span>
              <div className="detail-cast">
                {cast.map(a => (
                  <div key={a.id} className="detail-actor">
                    <div className="detail-actor-img">
                      {a.profile_path ? <img src={`${PROFILE_BASE}${a.profile_path}`} alt={a.name} /> : <span>👤</span>}
                    </div>
                    <p className="detail-actor-name">{a.name}</p>
                    <p className="detail-actor-char">{a.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieDetail