FROM node:15.11.0-alpine as stage1
COPY public /public
RUN cd /public && \
	npm ci && \
	npm run jshint && \
	npm run bundle

FROM golang:1.16.0-alpine as stage2
RUN apk --no-cache add ca-certificates gcc libc-dev
COPY . /data
COPY --from=stage1 /public /data/public
RUN cd /data && \
	go vet && \
	go test . && \
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build .

FROM scratch
COPY --from=stage2 /data/blockexchange /
EXPOSE 8080

CMD ["/blockexchange"]
