const TOKEN = import.meta.env.VITE_TMDB_TOKEN

const OPTIONS = {
  headers: {
    Authorization: `Bearer ${TOKEN}`
  }
}

export async function getPopularMovies() {
  const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=el-GR&page=1', OPTIONS)
  const data = await res.json()
  return data.results
}

export async function getRecentMovies() {
  const res = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=el-GR&page=1', OPTIONS)
  const data = await res.json()
  return data.results
}

export async function getMovieDetails(id) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=el-GR`, OPTIONS)
  return res.json()
}

export function getPosterUrl(path) {
  return `https://image.tmdb.org/t/p/w500${path}`
}