import loggerConfig from './LoggerConfig';

class LoggerUtils {

    private static instance: LoggerUtils;
    
    private constructor() {
    
    }
    
    public static getInstance(): LoggerUtils {
        if (!LoggerUtils.instance) {
            LoggerUtils.instance = new LoggerUtils();
        }

        return LoggerUtils.instance;
    }

    public static log(message: string): void {
        loggerConfig.info(message);
    }

    public static error(message: string): void {
        loggerConfig.error(message);
    }
    
}

export default LoggerUtils;