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
    questionImage?: string[];
    author: TUser;
    tags?: string[];
    upvotes: string[];
    downvotes: string[];
    answerCount: number;
    createdAt: Date;
    userVoteStatus?: string,
    comments: TCommentResponse[]
}


type TApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
}

interface TPaginatedResponse {
    question: TPost[];
    nextPage: number | null;
    totalPages: number;
}

type TInfiniteQuestionsData = {
    pages: TPaginatedResponse[];
    pageParams: unknown[];
}

type TInfiniteQuestionsReturn = {
    data: TInfiniteQuestionsData | undefined;
    isLoading: boolean;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
    error?: Error | null;
    observerTarget: React.RefObject<HTMLDivElement | null>;
}

interface TUserQuestionsReturn {
    data: TInfiniteQuestionsData | undefined;
    isLoading: boolean;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
    error: Error | null;
    observerTarget: React.RefObject<HTMLDivElement | null>;
}

interface TVoteType { vote: 'UP' | 'DOWN' }

interface TVoteRequestBody {
    postId: string;
    voteType: VoteType;
}

interface TMyVoteResponse {
    postId: string;
    voteType: VoteType;
}

interface TCommentRequest {
    questionId: string;
    authorId: string;
    content: string;
}

interface TCommentResponse {
    _id: string;
    content: string;
    author: {
        _id: string;
        name: string;
        image?: string;
    };
    createdAt: string;
}