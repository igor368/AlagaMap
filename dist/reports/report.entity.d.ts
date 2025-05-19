import { User } from '../users/user.entity';
export declare class Report {
    id: number;
    latitude: number;
    longitude: number;
    comment: string;
    street: string;
    active: boolean;
    createdAt: Date;
    user: User;
}
