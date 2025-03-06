ROOT_DIR := $(shell git rev-parse --show-toplevel)

infra_start:
	docker compose -f $(ROOT_DIR)/localdev/docker-compose.yaml up -d

migrate::
	npx prisma migrate dev --name init

seed:
	npx tsx $(ROOT_DIR)/db/seed.ts

start: infra_start migrate seed
stop:
	docker compose -f $(ROOT_DIR)/localdev/docker-compose.yaml down

generate_db_env: ## Generate random PostgreSQL credentials and save to .env files
	@echo "Generating random PostgreSQL credentials..."
	@bash -c 'RANDOM_DB="db_$$(openssl rand -hex 4)" && \
	RANDOM_USER="user_$$(openssl rand -hex 4)" && \
	RANDOM_PWD="$$(openssl rand -base64 12)" && \
	echo "Creating .env files..." && \
	echo "POSTGRES_PWD=$$RANDOM_PWD" > .env && \
	echo "POSTGRES_DB=$$RANDOM_DB" >> .env && \
	echo "POSTGRES_USER=$$RANDOM_USER" >> .env && \
	echo "DATABASE_URL=postgresql://$$RANDOM_USER:$$RANDOM_PWD@localhost:5432/$$RANDOM_DB" >> .env && \
	mkdir -p localdev && \
	echo "POSTGRES_PASSWORD=$$RANDOM_PWD" > ./localdev/.env && \
	echo "POSTGRES_DB=$$RANDOM_DB" >> ./localdev/.env && \
	echo "POSTGRES_USER=$$RANDOM_USER" >> ./localdev/.env && \
	echo "Credentials generated and saved to .env and ./localdev/.env"'
