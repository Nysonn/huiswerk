.PHONY: dev build start stop clean

dev:
	docker-compose up --build

build:
	docker-compose build

start:
	docker-compose up -d

stop:
	docker-compose down

clean:
	docker-compose down -v
	rm -rf node_modules dist
