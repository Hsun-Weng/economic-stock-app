application.yml
```yml
server:
  port: 8079 
spring: 
  http:
    converters:
      preferred-json-mapper: gson
  gson:
    date-format: yyyy-MM-dd
  data: 
    mongodb:
      host: {host}
      port: {port}
      database: {database}
      username: {username}
      password: {password}
      authentication-database: {auth_databasae}
```