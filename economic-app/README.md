application.yml template
```yml
spring: 
  datasource: 
    url: jdbc:mariadb://{host}:{port}/{database}
    username: {username}
    password: {password}
    driverClassName: org.mariadb.jdbc.Driver
  jpa: 
    hibernate:
      ddl-auto: validate  
retrofit:
  global-converter-factories:
    - retrofit2.converter.gson.GsonConverterFactory
security:
  key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  expirationTime: 10000000
  tokenPrefix: {tokenType}
  authenticationHeader: Authorization
  oauth2:
    clients:
      - providerName: facebook
        providerCode: 0
        clientId: ooooooooooooooooooooooooooooooo
        clientSecret: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        redirectUri: {redirectUri}
        accessTokenUri: https://graph.facebook.com/oauth/access_token?client_id={clientId}&redirect_uri={redirectUri}&client_secret={clientSecret}&code={code}
        userInfoUri: https://graph.facebook.com/me?fields={fields}
        fields:
          - name
          - email
service:
  data:
    url: {data url}
```