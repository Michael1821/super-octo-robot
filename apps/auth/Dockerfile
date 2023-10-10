FROM node:lts-alpine as production
WORKDIR /usr/src/app
RUN apk --no-cache --virtual build-dependencies add python3 make g++

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build auth
CMD ["node", "dist/apps/auth/main"]