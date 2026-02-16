
import Image from "next/image";

const LIGHT_GRADIENTS = [
    "bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-700",
    "bg-gradient-to-br from-rose-50 to-orange-100 text-rose-700",
    "bg-gradient-to-br from-emerald-50 to-teal-100 text-emerald-700",
    "bg-gradient-to-br from-amber-50 to-yellow-100 text-amber-700",
    "bg-gradient-to-br from-violet-50 to-purple-100 text-violet-700",
    "bg-gradient-to-br from-cyan-50 to-sky-100 text-cyan-700",
    "bg-gradient-to-br from-fuchsia-50 to-pink-100 text-fuchsia-700",
    "bg-gradient-to-br from-slate-100 to-gray-200 text-slate-800",
];

const getPostGradient = (postId: string | undefined) => {
    if (!postId) return LIGHT_GRADIENTS[0];

    let hash = 0;
    for (let i = 0; i < postId.length; i++) {
        hash = postId.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % LIGHT_GRADIENTS.length;
    return LIGHT_GRADIENTS[index];
};

interface PostImageProps {
    post: TPost;
    imageUrl?: string;
    className?: string;
}

const PostImage = ({ post, className = "h-48 w-full" }: PostImageProps) => {
    const gradientClass = getPostGradient(post._id);

    if (post?.questionImage && post.questionImage?.some((img: string) => img && img.trim() !== '')) {
        return (
            <div className={`relative overflow-hidden rounded-xl ${className}`}>
                <Image
                    src={post.questionImage[0]}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-300"
                />
            </div>
        );
    }
    return (
        <div className={`relative flex items-center justify-center overflow-hidden rounded-xl text-center font-bold tracking-tight shadow-sm border border-slate-100 ${gradientClass} ${className}`}>
            <div className="absolute inset-0 opacity-10" />
            <span className="relative z-10 text-xs md:text-xs line-clamp-3 capitalize">
                {post.title}
            </span>
        </div>
    );
};
export default PostImage