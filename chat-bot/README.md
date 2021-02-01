application.yml
```yaml
telegram:
  bot:
    id: {telegram_id}
    token: {telegram_token}
    sendApi: {send_api}
    sendTimeout: 10000
line:
  bot:
    channel-token: {line_channel_token}
    channel-secret: {line_channel_secret}
    handler:
      path: /line
retrofit:
  global-converter-factories:
    - retrofit2.converter.gson.GsonConverterFactory
service:
  economic:
    url: {economicUrl}
  data:
    url: {dataUrl}
```