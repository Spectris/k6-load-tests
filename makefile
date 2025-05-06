include .env

build:
	docker-compose build

run:
	docker-compose up --build

start:
	docker-compose up

down:
	docker-compose down

rebuild:
	docker-compose up --build --force-recreate

logs:
	docker-compose logs --tail=50

check-secrets:
	test -f .secrets/TOKEN_SECRET || (echo "❌ Missing secret file!" && exit 1)

