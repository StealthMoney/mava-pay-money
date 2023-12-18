start:
	docker-compose up
	yarn dev

start-deps:
	make start-db
	make start

start-db:
	docker run --name mava-pay-money -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mava-pay-money -d -p 5432:5432 postgres

stop:
	docker-compose down
