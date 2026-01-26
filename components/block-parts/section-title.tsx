export default function SectionTitle({
    title,
    subtitle,
}: {
    title: string;
    subtitle?: string;
}) {
    return (
        <div className="my-16 text-center">
            <h2 className="text-4xl font-semibold text-mediumblue">{title}</h2>
            {subtitle && (
                <p className="mt-2 text-lg text-mediumblue">{subtitle}</p>
            )}
        </div>
    );
}