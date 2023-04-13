import { pino } from "pino";

const _LOG = pino({ transport: { target: "pino-pretty" } });

/** pino logger wrapper */
const Log = {
  info: (obj: any, message?: string, ...args: any[]) =>
    _LOG.info(obj, message, ...args),
  warn: (obj: any, message?: string, ...args: any[]) =>
    _LOG.warn(obj, message, ...args),
  error: (error: any, message?: string, ...args: any[]) =>
    _LOG.error(error, message, ...args),
  debug: (obj: any, message?: string, ...args: any[]) =>
    _LOG.debug(obj, message, ...args),
};

export default Log;
