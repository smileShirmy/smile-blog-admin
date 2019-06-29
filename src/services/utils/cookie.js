import cookies from 'js-cookie'

export function saveTokens(accessToken, refreshToken) {
  cookies.set('access_token', `Bearer ${accessToken}`)
  cookies.set('refresh_token', `Bearer ${refreshToken}`)
}

export function saveAccessToken(accessToken) {
  cookies.set('access_token', `Bearer ${accessToken}`)
}

export function getToken(tokenKey) {
  return cookies.get(tokenKey)
}

export function removeToken() {
  cookies.remove('access_token')
  cookies.remove('refresh_token')
  sessionStorage.removeItem('flag')
  sessionStorage.clear()
  localStorage.clear()
}
