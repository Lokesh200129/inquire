type TUser = {
    _id?: string,
    name?: string,
    email?: string,
    password?: string,
    bio?: string,
    location?: string,
    occupation?: string,
    profileImage?: string
}

type TPost = {
    _id?: string,
    title: string;
    content: string;
    questionImage?: string;
    author: {
        name: string;
        occupation: string;
        profileImage?: string;
    };
    tags?: string[];
    upvotes: string[];
    downvotes: string[];
    answerCount: number;
    createdAt: Date;
}
