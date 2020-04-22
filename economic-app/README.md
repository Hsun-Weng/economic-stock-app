application.yml
```yml
spring: 
  http:
    converters:
      preferred-json-mapper: gson
  gson:
    date-format: yyyy-MM-dd
  datasource: 
    url: jdbc:mysql://{host}:{port}/{database}
    username: {username}
    password: {password}
    driverClassName: com.mysql.cj.jdbc.Driver
  jpa: 
    database-platform: org.hibernate.dialect.MySQL8Dialect
    hibernate:
      ddl-auto: update  
```