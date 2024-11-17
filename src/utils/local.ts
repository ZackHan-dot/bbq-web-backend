export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token: string) {
  if (!token) return;
  localStorage.setItem('token', token);
}

export function clearToken() {
  localStorage.removeItem('token');
}
