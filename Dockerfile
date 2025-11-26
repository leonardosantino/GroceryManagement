FROM nginx:1.29.1-alpine3.22

COPY out/ /usr/share/nginx/html/
COPY web/conf.d/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80