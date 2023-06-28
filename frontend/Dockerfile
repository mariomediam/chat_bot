# syntax=docker/dockerfile:1.4

FROM node:18.3 AS development

RUN npm install -g nodemon

ENV CI=true
ENV PORT=3000

WORKDIR /code
COPY package.json /code/package.json
# COPY package-lock.json /code/package-lock.json
RUN npm i
COPY . /code

# -------------------------------------------
CMD ["npm", "run", "dev"]

FROM development AS builder

RUN npm run build

FROM development as dev-envs
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "start" ]

FROM nginx:1.13-alpine

COPY --from=builder /code/build /usr/share/nginx/html
