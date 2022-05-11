# challenge

docker run --name postgrechallenge -e "POSTGRES_USER"="peculiarvale" -e "POSTGRES_PASSWORD"="azerty123" -e POSTGRES_DB=challenge -p 5432:5432 -d postgres