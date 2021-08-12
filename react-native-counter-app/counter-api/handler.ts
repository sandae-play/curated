import {UserCount, UserCountRepository} from "./models";
import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";
import {pipe} from "fp-ts/function";

const repo = new UserCountRepository();

const get = async (event) => {
    const {userId} = event.pathParameters;

    const found = await repo.findOne(userId);
    if (found == O.none) {
        return pipe(
            await repo.add(UserCount.createUser(userId)),
            E.fold(
                ({ message }) => ({
                    statusCode: 500,
                    body: JSON.stringify({
                        success: false,
                        message
                    })
                }),
                model => ({
                    statusCode: 201,
                    body: JSON.stringify(model)
                })
            )
        )
    }

    return pipe(
        found,
        O.fold(
            () => ({ statusCode: 404, body: JSON.stringify({ message: 'Count not found'})}),
            model => ({statusCode: 200, body: JSON.stringify(model)})
        )
    );
};

const patch = async (event) => {
    const {userId} = event.pathParameters;
    const instruction = JSON.parse(event.body);

    const increment = parseInt(instruction.increment);
    if (isNaN(increment)) {
        return {
            statusCode: 422,
            body: JSON.stringify({
                success: false,
                message: "Invalid increment value"
            })
        }
    }

    return pipe(
        await repo.findOne(userId),
        O.map(model => repo.update(model.increment(increment))),
        O.fold(
            () => ({
                statusCode: 422,
                body: JSON.stringify({
                    success: false,
                    message: "No count record for user"
                })
            }),
            _ => ({
                statusCode: 200,
                body: JSON.stringify({
                    success: true
                })
            })
        )
    );
}

module.exports = {get, patch};
