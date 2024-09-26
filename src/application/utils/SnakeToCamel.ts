function snakeToCamel(str: string): string {
    return str.replace(/(_\w)/g, (match) => match[1].toUpperCase());
}

function parseKeysToCamelCase(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(item => parseKeysToCamelCase(item));
    } else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => {
            const camelCaseKey = snakeToCamel(key);
            acc[camelCaseKey] = parseKeysToCamelCase(obj[key]);
            return acc;
        }, {} as any);
    }
    return obj;
}

export { parseKeysToCamelCase };