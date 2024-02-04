/* eslint-disable no-console */
import type { LoggingService } from "../../../../application/services/logging/logging-service";

export class ConsoleLoggingService implements LoggingService {
    debug(message: string[] | string): void {
        console.debug(message);
    }

    error(message: string[] | string): void {
        console.error(message);
    }

    info(message: string[] | string): void {
        console.info(message);
    }
    log(message: string[] | string): void {
        console.log(message);
    }

    warn(message: string[] | string): void {
        console.warn(message);
    }
}
