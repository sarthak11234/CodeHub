// Skeleton loader shapes for different use cases

/** A single skeleton block — just a plain shimmer rectangle */
export function SkeletonBlock({ className = '' }: { className?: string }) {
    return <div className={`skeleton ${className}`} />;
}

/** Skeleton for a problem card in the grid */
export function SkeletonProblemCard() {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-start justify-between">
                <div className="skeleton w-8 h-8 rounded-lg" />
                <div className="skeleton w-16 h-6 rounded-full" />
            </div>
            <div className="space-y-2">
                <div className="skeleton w-3/4 h-5" />
                <div className="skeleton w-1/2 h-4" />
            </div>
            <div className="skeleton w-full h-10 rounded-lg" />
            <div className="flex gap-4 pt-2">
                <div className="skeleton w-16 h-4" />
                <div className="skeleton w-20 h-4" />
            </div>
        </div>
    );
}

/** Skeleton for a leaderboard table row */
export function SkeletonLeaderboardRow() {
    return (
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5">
            <div className="col-span-1 flex items-center">
                <div className="skeleton w-6 h-6 rounded-full" />
            </div>
            <div className="col-span-5 flex items-center gap-3">
                <div className="skeleton w-10 h-10 rounded-full" />
                <div className="skeleton w-24 h-4 rounded" />
            </div>
            <div className="col-span-3 flex items-center justify-center">
                <div className="skeleton w-12 h-4 rounded" />
            </div>
            <div className="col-span-3 flex items-center justify-center">
                <div className="skeleton w-16 h-4 rounded" />
            </div>
        </div>
    );
}
