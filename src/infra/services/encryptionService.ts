import bcrypt from 'bcrypt';

const PEPPER = process.env.ADMIN_PEPPER || "";

// hashing logic
export function performPasswordHash(passwordString: string) : string
{
    // console.log('string:'+passwordString);
    return bcrypt.hashSync(pepperedString(passwordString), 10);
}

// comparing logic
export function compareHash(string: string, hash : string) : boolean
{
    // console.log('hash:'+bcrypt.compareSync(pepperedString(string), hash));
    return bcrypt.compareSync(pepperedString(string), hash);
}

// pepper logic
function pepperedString(string: string) : string
{
  // console.log('peppered:'+ PEPPER+string+PEPPER);
  return PEPPER+string+PEPPER;
}

// for testing : 1. hash somestring 2. compare somestring with provided hash at step 1