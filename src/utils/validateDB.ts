const validTypes = ['String', 'Number', 'Date', 'Buffer', 'Boolean', 'Mixed', 'ObjectId', 'Array', 'Decimal128', 'Map', 'UUID'];

const validateSchema = (schema: string) => new Promise((resolve, reject) => {
    try {
        const parsedSchema = JSON.parse(schema);
        for (const key in parsedSchema) {
            if (parsedSchema.hasOwnProperty(key)) {
                const element = parsedSchema[key];
                if (!element || !validTypes.includes(element)) {
                    reject(`Invalid type for ${key}`);
                }
            }
        }
        resolve(parsedSchema);
    } catch (error) {
        reject(error);
    }

});

export default validateSchema;