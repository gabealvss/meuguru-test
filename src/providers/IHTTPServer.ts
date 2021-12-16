interface IHTTPServer {
  start(port: number): void;
  stop(): void;
}

export { IHTTPServer };
