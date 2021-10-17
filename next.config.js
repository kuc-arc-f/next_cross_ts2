module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: ['pages/', 'components/', 'graphql/', 'lib/']
  },
  env: {
    COOKIE_KEY_USER_ID: "ap21uid",
    API_URL: "http://localhost:3001",
    MY_SITE_ID: "1111",
    MY_API_KEY: "1111",
    CSRF_SECRET : 'secret1234',
    BASE_URL: "http://localhost:3002", 
    GIT_OWNER: "hoge",
    GIT_TOKEN: "111",
    GIT_API_URL: "https://api.github.com"       
  },  
}
