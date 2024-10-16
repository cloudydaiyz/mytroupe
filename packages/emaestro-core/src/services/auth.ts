import { BaseDbService } from "./base";
import { Collection } from "mongodb";
import { UserSchema, UserSessionSchema } from "../types/core-types";
import { DB_NAME } from "../util/constants";
import zxcvbn from "zxcvbn";
import assert from "assert";
import { TroupeCoreService } from "./core";

/**
 *  1. Encrypt passwords at rest
 *  2. Recycle keys to encrypt / decrypt tokens daily
 *  3. Recycle keys to encrypt / decrypt passwords weekly
 */
export class AuthService extends BaseDbService {
    userColl: Collection<UserSchema>;
    sessionColl: Collection<UserSessionSchema>;

    constructor() { 
        super();
        this.userColl = this.client.db(DB_NAME).collection("users");
        this.sessionColl = this.client.db(DB_NAME).collection("sessions");
    }

    /** Creates a new account with the associated troupe */
    async register(email: string, password: string): Promise<void> {
        const insertUser = await this.userColl.insertOne({ email, password });
        assert(insertUser.acknowledged, "Failed to create user");
    }
    
    /** Creates a new user session and returns the associated access and refresh tokens */
    login(email: string, password: string) {

    }

    /** Validates a given access token */
    validate(accessToken: string): boolean {
        return true;
    }

    /** Refreshes access credentials */
    refresh(refreshToken: string) {

    }

    /** Deletes the account & troupe associated with the account */
    delete(accessToken: string) {

    }
}