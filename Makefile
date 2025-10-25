.PHONY: build up down clean

# Define variables for convenience
COMPOSE_FILE := docker-compose.yml
PROJECT_NAME := my-app

# Target to build Docker images defined in docker-compose.yml
build:
	docker compose -f $(COMPOSE_FILE) -p $(PROJECT_NAME) build

# Target to build and start the services
up: build
	docker compose -f $(COMPOSE_FILE) -p $(PROJECT_NAME) up -d

# Target to stop and remove the services
down:
	docker compose -f $(COMPOSE_FILE) -p $(PROJECT_NAME) down

# Target to remove all volumes, networks, and images created by docker compose

restart:
	docker compose -f $(COMPOSE_FILE) -p $(PROJECT_NAME) down && docker compose -f $(COMPOSE_FILE) -p $(PROJECT_NAME) build && docker compose -f $(COMPOSE_FILE) -p $(PROJECT_NAME) up -d

clean:
	docker compose -f $(COMPOSE_FILE) -p $(PROJECT_NAME) down --volumes --rmi all