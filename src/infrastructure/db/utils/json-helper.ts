export function serializeBigIntToJSON(obj: any): any {
    if (obj === null || obj === undefined) return obj;
    
    // تبدیل آبجکت و مدیریت BigInt
    const serializedString = JSON.stringify(obj, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
    );
    
    // پارس مجدد به آبجکت استاندارد برای Prisma
    return JSON.parse(serializedString);
}