FROM node:18.13
WORKDIR /app
COPY package.json .
COPY tsconfig.json .
COPY src ./src
RUN ls -a
RUN npm install
RUN npm run build

## this is stage two , where the app actually runs
FROM node:18.13
WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY --from=0 /usr/dist .
RUN npm install pm2 -g
EXPOSE 80
CMD ["pm2-runtime","app.js"]