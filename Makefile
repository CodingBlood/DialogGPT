.PHONY: dev build down logs clean train lint test frontend backend start

dev:
	docker compose up --build

build:
	docker compose build

down:
	docker compose down

logs:
	docker compose logs -f

clean:
	docker compose down -v --remove-orphans

train:
	python ml/training/train.py

lint:
	black backend/

test:
	pytest backend/tests/

frontend:
	cd frontend/DialogGPT && npm run dev

backend:
	cd backend && fastapi dev main.py
