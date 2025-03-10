'use server'

import 'server-only'
import {hash} from "bcrypt-ts-edge";

export async function hashPassword(pwd: string) {

    if(!process.env.SALT) {
        throw new Error('SALT environment variable is missing')
    }
    const number: number = parseInt(process.env.SALT);
    return hash(pwd, number)
}