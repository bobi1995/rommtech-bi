const timeout = 120_000_000;

const localDB = {
  user: "sa",
  password: "!Qaz2wsx",
  server: "192.168.0.82",
  database: "BG1000",
  port: 1433,
  options: {
    encrypt: false,
    enableArithAbort: false,
  },
  requestTimeout: timeout,
  pool: {
    max: 1000,
    min: 1,
    idleTimeoutMillis: timeout,
    acquireTimeoutMillis: timeout,
    createTimeoutMillis: timeout,
    destroyTimeoutMillis: timeout,
    reapIntervalMillis: timeout,
    createRetryIntervalMillis: timeout,
  },
};

export default localDB;
