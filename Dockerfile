FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY .next ./.next

CMD [ "npm", "run", "start" ]




# FROM alpine:latest

# LABEL author="mnuralim"
# LABEL age="22"

# RUN mkdir hello
# RUN echo "Hello WOrld" > "hello/world.txt"

# CMD cat "hello/world.txt"

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD npm run devFROM node:18-alpine as builder
# WORKDIR /my-space

# COPY package.json package-lock.json ./
# RUN npm ci
# COPY . .
# RUN npm run build

# FROM node:18-alpine as runner
# WORKDIR /my-space
# COPY --from=builder /my-space/package.json .
# COPY --from=builder /my-space/package-lock.json .
# COPY --from=builder /my-space/next.config.mjs ./
# COPY --from=builder /my-space/public ./public
# COPY --from=builder /my-space/.next/standalone ./
# COPY --from=builder /my-space/.next/static ./.next/static
# EXPOSE 3000
# ENTRYPOINT ["npm", "start"]
