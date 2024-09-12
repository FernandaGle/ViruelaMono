import 'dotenv/config';
import * as env from 'env-var'

export const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    MONGO_URL: env.get("MONGO_URL").required().asString(),
    MONGO_DB:env.get("MONGO_DB").required().asString(),
    MAIL_SERVICE: env.get("MAIL_SERVICE").asString(),
    MAIL_SECRET_KEY: env.get("MAIL_SECRET_KEY").asString(),
    MAIL_USER: env.get("MAIL_USER").asString(),
    MAPBOX_ACCESS_TOKEN: env.get("MAPBOX_ACCESS_TOKEN").required().asString()
};