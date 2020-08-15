interface LoggerData {
    'url': string,
    'method': string,
    'body': any,
    'statusCode': string
}

export class LoggerFactory {
    extractLoggerData(context: Array<any>): LoggerData {
        let request = { url: '', method: '', body: '', statusCode: '' };
        if (context.length) {
            const rawRequest = context[0];
            if (rawRequest.res && rawRequest.res.statusCode)
                rawRequest.statusCode = rawRequest.res.statusCode;
            request = rawRequest;
        
        }
        return {
            'url': request.url,
            'method': request.method,
            'body': request.body,
            'statusCode': request.statusCode
        };
    }
}
