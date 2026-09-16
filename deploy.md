# Deploy the backend with Docker

The backend listens on port `8080` and needs MongoDB and Redis. The commands below build the backend image, publish it to Docker Hub, and run it on a server.

## 1. Set your image name

Replace `YOUR_DOCKERHUB_USERNAME` with your Docker Hub username:

```bash
export DOCKERHUB_USERNAME=YOUR_DOCKERHUB_USERNAME
export IMAGE_NAME=$DOCKERHUB_USERNAME/garba-partner-backend
export IMAGE_TAG=latest
```

## 2. Build and test the image locally

Run these commands from the repository root:

```bash
docker build -t $IMAGE_NAME:$IMAGE_TAG ./backend
docker run --rm -p 8080:8080 \
  -e SPRING_DATA_MONGODB_URI='mongodb://root:secret@host.docker.internal:27017/garba_partner?authSource=admin' \
  -e SPRING_DATA_REDIS_HOST=host.docker.internal \
  -e SPRING_DATA_REDIS_PORT=6379 \
  $IMAGE_NAME:$IMAGE_TAG
```

For Linux servers, `host.docker.internal` may not resolve. Use the service names from the Compose example below, or replace it with the reachable database host.

## 3. Push the image to Docker Hub

```bash
docker login
docker push $IMAGE_NAME:$IMAGE_TAG
```

For a versioned release, use a version tag as well:

```bash
export IMAGE_TAG=1.0.0
docker build -t $IMAGE_NAME:$IMAGE_TAG ./backend
docker push $IMAGE_NAME:$IMAGE_TAG
```

## 4. Deploy on the server

Install Docker and Docker Compose on the server, then create a deployment directory:

```bash
mkdir -p ~/garba-partner
cd ~/garba-partner
```

Create `docker-compose.yml` with this content. Replace `YOUR_DOCKERHUB_USERNAME` with the same Docker Hub username:

```yaml
services:
  backend:
    image: YOUR_DOCKERHUB_USERNAME/garba-partner-backend:latest
    container_name: garba-partner-backend
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      SPRING_DATA_MONGODB_URI: mongodb://root:secret@mongodb:27017/garba_partner?authSource=admin
      SPRING_DATA_REDIS_HOST: redis
      SPRING_DATA_REDIS_PORT: 6379
    depends_on:
      - mongodb
      - redis

  mongodb:
    image: mongo:7
    container_name: garba-partner-mongodb
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: secret
      MONGO_INITDB_DATABASE: garba_partner
    volumes:
      - mongodb_data:/data/db

  redis:
    image: redis:7-alpine
    container_name: garba-partner-redis
    restart: unless-stopped
    volumes:
      - redis_data:/data

volumes:
  mongodb_data:
  redis_data:
```

Start the deployment:

```bash
docker compose pull
docker compose up -d
```

Check the containers and backend logs:

```bash
docker compose ps
docker compose logs -f backend
```

The API will be available at:

```text
http://YOUR_SERVER_IP:8080
```

## 5. Deploy a new version

After pushing a new image to Docker Hub:

```bash
cd ~/garba-partner
docker compose pull backend
docker compose up -d backend
docker image prune -f
```

## Production notes

- Change the MongoDB password before deploying publicly.
- Store secrets in a server-side `.env` file or secret manager instead of committing them.
- Put the backend behind HTTPS and a reverse proxy such as Nginx or Caddy.
- Open only the ports required by your reverse proxy and application firewall.
