FROM ubuntu:latest
LABEL authors="Aurélien BOCH"

ENTRYPOINT ["top", "-b"]
