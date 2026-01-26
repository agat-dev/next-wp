export default function VideoAutoplayLoopMuted({ src }: { src: string }) {
    // Si src est un iframe HTML, on l'injecte tel quel, en forçant les bons paramètres pour autoplay, loop, muted, pas de contrôles
    if (typeof src === 'string' && src.includes('<iframe')) {
        // Ajoute ou remplace les paramètres d'URL pour YouTube, Vimeo, etc.
        const urlMatch = src.match(/src=["']([^"']+)["']/i);
        let newSrc = src;
        if (urlMatch && urlMatch[1]) {
            let url = urlMatch[1];
            // Ajout des paramètres pour YouTube
            if (url.includes('youtube.com')) {
                url = url.replace(/([?&])controls=\d+/g, '')
                         .replace(/([?&])autoplay=\d+/g, '')
                         .replace(/([?&])mute=\d+/g, '')
                         .replace(/([?&])loop=\d+/g, '');
                url += (url.includes('?') ? '&' : '?') + 'autoplay=1&mute=1&controls=0&loop=1&playlist=' + (url.split('/embed/')[1]?.split('?')[0] || '');
            }
            // Ajout des paramètres pour Vimeo
            if (url.includes('vimeo.com')) {
                url = url.replace(/([?&])background=\d+/g, '');
                url += (url.includes('?') ? '&' : '?') + 'background=1&autoplay=1&muted=1&loop=1&controls=0';
            }
            // Remplace l'URL dans l'iframe
            newSrc = src.replace(urlMatch[1], url);
        }
        return (
            <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                <span
                    className="w-full h-full block"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        __html: newSrc.replace(
                            /<iframe /,
                            '<iframe style="width:100%;height:100%;position:absolute;top:0;left:0;object-fit:contain;" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen '
                        )
                    }}
                />
            </div>
        );
    }

    // Sinon, on suppose que c'est une URL directe vers une vidéo
    return (
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
            <video
                className="w-full h-full object-contain"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
            >
                <source src={src} />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}