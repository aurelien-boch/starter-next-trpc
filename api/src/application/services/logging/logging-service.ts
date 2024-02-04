export interface LoggingService {
    log(message: string[] | string): void;
    error(message: string[] | string): void;
    warn(message: string[] | string): void;
    info(message: string[] | string): void;
    debug(message: string[] | string): void;
}
