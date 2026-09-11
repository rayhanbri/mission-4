import { PostStatus } from "../../../generated/prisma/enums";

export interface ICreatePostPayload {
    title : string;
    content : string;
    thumbnail ?: string;
    isFeatured ?: boolean;
    isPremium ?: boolean
    status ?: PostStatus
    tags : string[]
}