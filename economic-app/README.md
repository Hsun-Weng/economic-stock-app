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
  facebook:
    clientId: {clientId}
    clientSecret: {clientSecret}
    redirectUri: {redirectUri}
    url: {url}
    fields:
      - name
      - email
service:
  data:
    url: {data url}
```