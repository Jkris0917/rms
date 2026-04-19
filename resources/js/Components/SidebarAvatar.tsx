import { getInitials } from "@/types/helper";


interface AvatarProps {
    name?: string;
    size?: 'sm' | 'md' | 'lg';
}

const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-9 h-9 text-sm',
};

export default function SidebarAvatar({ name, size = 'md' }: AvatarProps) {
    return (
        <div
            className={`${sizes[size]} flex items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white font-semibold flex-shrink-0 ring-2 ring-white shadow-sm`}
        >
            {getInitials(name)}
        </div>
    );
}
