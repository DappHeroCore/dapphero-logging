import { createLogger, format, transports } from 'winston'
import { Loggly } from 'winston-loggly-bulk'

const winstonLogger = createLogger({ format: format.combine(format.json()) })

winstonLogger.add(new Loggly({
  token: '0c02fa85-a311-4c99-9b0b-102b79ef16c2',
  subdomain: 'dapphero',
  tags: [ 'format-simple-json-false' ],
  json: true
}))

export { winstonLogger }