export class AuthToken {
  setToken(key, token) {
    localStorage.setItem(key, token);
  }
  getToken(key) {
    return localStorage.getItem(key);
  }
}
