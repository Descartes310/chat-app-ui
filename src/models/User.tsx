export default class User {

    private fullName: string;
    private avatar: string;

    constructor(user: any) {
        Object.assign(this, user);
        this.fullName = user.fullName;
        this.avatar = user.avatar;
    }

    getFullName(): string {
        return this.fullName;
    }

    getAvatar(): string {
        return this.avatar;
    }
}
