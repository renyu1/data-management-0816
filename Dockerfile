FROM management-demo-base:20190701
#FROM what-ubuntu2:5000/node:10.16.0-alpine

COPY dist ./dist/
COPY server ./server/
COPY views ./views/

EXPOSE 3001

CMD ["pm2-runtime", "/usr/app/server/app.js"]
