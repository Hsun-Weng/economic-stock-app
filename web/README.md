
### 開發時代理轉發設定
src/setupProxy.js
```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://#####:OOOO',
            changeOrigin: true,
            pathRewrite: {
                '^/api':'' 
            }
        })
    );
};
```
### Facebook OAuth2 導向登入頁設定
src/config.js
```javascript
export default {
    oauth: {
        facebook: {
            authorizationUrl: "{facebnook endpoint with clientId etc...}",
        }
    }
}
```