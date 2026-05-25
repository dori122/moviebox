const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWNmYWRmM2YyNWIwNmFhMTRhODhhMDU2NjQxNDMwYyIsIm5iZiI6MTc3OTY3MDgwOC43NDUsInN1YiI6IjZhMTM5ZjE4ODI4YTdiMDczNjZlOTVmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ce059JvMXehW6XS-i_2FtEDcR7Ci-CgTIkmg2oRJ3ug'

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