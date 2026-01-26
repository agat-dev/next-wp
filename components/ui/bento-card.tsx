interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export default function BentoCard({ children, className = "", style }: BentoCardProps) {
    return (
        <div
            className={`bento-card bg-mediumblue/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg shadow-white/10 ${className}`}
            style={style}
        >
            {children}
        </div>
    );
}