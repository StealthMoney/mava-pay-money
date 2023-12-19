start:
	docker-compose up
	yarn dev

start-deps-dev:
	make start-db
	npx prisma migrate reset

start-db:
	docker run --name mava-pay-money -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mava-pay-money -d -p 5442:5432 postgres

stop:
	docker-compose down
