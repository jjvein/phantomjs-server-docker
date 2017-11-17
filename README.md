# phantomjs-server-docker

## 使用简介

```
docker pull registry.cn-hangzhou.aliyuncs.com/jjvein/phantomjs2.1.1-server

docker run -d -p 8888:8888 docker pull registry.cn-hangzhou.aliyuncs.com/jjvein/phantomjs2.1.1-server

```

通过postman :
url: localhost:8888
method: POST
header: 
    - Content-Type: application/x-www-form-urlencoded
POST-kv: 
    - url: http://www.qq.com

## 日志查看

`docker logs -t [container_id]`


