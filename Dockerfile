FROM wernight/phantomjs

WORKDIR /
COPY server.js /

RUN mkdir -p /tmp/django
EXPOSE 8888
CMD phantomjs --cookies-file=/tmp/django/cookie --local-storage-path=/tmp/django/local-storage --local-storage-quota=500000  server.js 8888


