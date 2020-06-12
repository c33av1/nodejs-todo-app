-- Run development
`npm run dev`

-- Docker

1. create Dockerfile
2. Building your image by running command `docker build -t <image name> .`
3. Check images `docker images`
4. Run the image
   `docker run -p 49160:8080 -d <image name>` (NOT WORKING)
   -d runs the container in detached mode, leaving the container running in the background.
   -p flag redirects a public port to a private port inside the container.

`docker run <image name / image id>` (WORKING)

- Dockercompose
  When using docker-compose.yml
  use `docker-compose up`
  or `docker-compose down`
