import * as bcrypt from 'bcrypt';

/**
 *
 * @param password user password to hash
 * @returns hashed password of the user
 */

export async function hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
}

/**
 *
 * @param password user password input
 * @param hash the hashed user password stored in the db
 * @returns true if user input ( after hashing ) equal the hashed stored password
 */

export async function isMatch(
    password: string,
    hash: string,
): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}
