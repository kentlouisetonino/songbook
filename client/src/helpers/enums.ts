export enum APIEndpoint {
  AuthLogin = '/auth/login',
  User = '/user',
  UserCreate = '/user/create',
  Song = '/song',
  SongCreate = '/song/create',
  SongUpdate = '/song/update',
  SongDelete = '/song/delete',
  SongAllByUser = '/song/all/user',
  SongAllByArtist = '/song/all/artist',
  SongAllByTitle = '/song/all/title',
}

export enum CookiesStorage {
  AccessToken = 'accessToken',
}

export enum PageRoute {
  Root = '/',
  Song = '/song',
  SongAdd = '/song/add',
  Login = '/login',
  Register = '/register',
}

