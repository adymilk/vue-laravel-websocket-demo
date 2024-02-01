## docker 打包推送
### 登陆
```bash
docker login
```

### 构建推送
```bash
docker buildx build -t adymilk/helper:latest --platform=linux/arm64,linux/amd64 . --push
```