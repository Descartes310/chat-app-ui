export default class User {

    private fullName: string;
    private avatar: string;
    private id: number;

    constructor(user: any) {
        Object.assign(this, user);
        this.fullName = user.fullName;
        this.avatar = user.avatar;
        this.id = user.id;
    }

    getFullName(): string {
        return this.fullName;
    }

    getAvatar(): string {
        return this.avatar;
    }
    
    getId(): number {
        return this.id;
    }
}
