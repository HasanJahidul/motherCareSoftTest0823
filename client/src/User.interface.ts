//create a  User type response
export interface IUser {
    email: string;
exp: number;
iat: number;
role : string;
sub : string;
}
export interface IUserList {
        _id: string,
        firstName: string
        lastName: string
        email: string
        username: string
        password:string
        role: string
        createdAt: Date
        updatedAt: Date
}
//create a  User type response
// export interface IUserList {
//     users: IUserResponse[];
//     total: number;
// }