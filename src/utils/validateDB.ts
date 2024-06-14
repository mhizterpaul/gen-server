type Schema = {
    [key: string] : string | Schema
}

const validTypes = ['String', 'Number', 'Date', 'Buffer', 'Boolean', 'Mixed', 'ObjectId', 'Array', 'Decimal128', 'Map', 'UUID'];

const validateDB = (db : string) => {
    
    const parsedDb = JSON.parse(db)
    let callBacks = 1;

    const checkValues = (Obj : Schema) => {
        
        for(const key in Object.keys(Obj)){
            if(typeof(Obj[key]) === "object"){
                callBacks += 1;
                checkValues(Obj[key]);
            }else{

                if(callBacks === 1 || !validTypes.includes(Obj[key]))  return {
                    isSuccessful: false,
                     error: `The database Scheme contains invalid Type ${Obj[key]}` };     
            }
        }

        return {isSuccessful: true, parsedDb}
    }

    return checkValues(parsedDb)
}



export default validateDB;