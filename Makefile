run: 
	docker run -d -p 3000:3000 --name atm-service --rm resenpai/atm-service
stop:
	docker stop atm-service