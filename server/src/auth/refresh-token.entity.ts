import {sign} from 'jsonwebtoken';
import { ObjectId } from 'typeorm';
class RefreshToken {

    constructor(init?: Partial<RefreshToken>) {
        Object.assign(this, init);
    }
    id: ObjectId;
    email: string;

    sign(): string {
        return sign({ ...this}, process.env.REFRESH_TOKEN_SECRET);
    }
}
export default RefreshToken