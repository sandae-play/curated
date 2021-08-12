import * as db from "./db";
import {none, Option, some} from "fp-ts/Option";
import {Either, left, right} from "fp-ts/Either";

export class UserCount {
    constructor(private userId: string, private count: number) { }

    static createUser(userId: string): UserCount {
        return new UserCount(userId, 0);
    }

    increment(value: number) {
        this.count = this.count + value;
        return this;
    }

    getUserId() {
        return this.userId;
    }

    getCount() {
        return this.count;
    }
}

export class UserCountRepository {
    async update(model: UserCount) {
        await db.query("UPDATE user_counts SET count = $1 WHERE user_id = $2", [model.getCount(), model.getUserId()]);
        return model;
    }

    async add(model: UserCount): Promise<Either<Error, UserCount>> {
        const exists = await this.findOne(model.getUserId());
        if (exists != none) {
            return left(new Error("Count already exists!"));
        }

        await db.query("INSERT INTO user_counts VALUES ($1, $2)", [model.getUserId(), model.getCount()]);
        return right(model);
    }

    async findOne(userId: string): Promise<Option<UserCount>> {
        const result: any = await db.query("SELECT count FROM user_counts WHERE user_id = $1", [userId]);
        if (result === undefined) {
            return none;
        }

        return some(new UserCount(userId, result.count));
    }
}
