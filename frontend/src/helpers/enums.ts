export enum APIEndpoint {
  AUTH_LOGIN = '/auth/login',
  USER = '/user',
  USER_CREATE = '/user/create',
  SONG = '/song',
  SONG_CREATE = '/song/create',
  SONG_UPDATE = '/song/update',
  SONG_DELETE = '/song/delete',
  SONG_ALL_BY_USER = '/song/all/user',
  SONG_ALL_BY_ARTIST = '/song/all/artist',
  SONG_ALL_BY_TITLE = '/song/all/title',
}

export enum CookiesStorage {
  ACCESS_TOKEN = 'accessToken',
}

export enum PageRoute {
  HOME = '/',
  SONG = '/song',
  SONG_UPDATE = '/song',
  SONG_ADD = '/song/add',
  SONG_ALL = '/',
  LOGIN = '/login',
  REGISTER = '/register',
}
