import domtoimage from 'dom-to-image';

const saveAs = (uri: string, filename: string) => {
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;

        // Firefox requires the link to be in the body
        document.body.appendChild(link);

        // simulate click
        link.click();
        // remove the link when done
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
};

const printDomToImage = (node: HTMLElement) => {
    // if (canvasRef.current) {
    domtoimage
        .toPng(node)
        .then(function (dataUrl: any) {
            const img = new Image();
            img.src = dataUrl;
            saveAs(dataUrl, 'slika');
        })
        .catch(function (error: any) {
            console.error('oops, something went wrong!', error);
        });
    // }
};

export default printDomToImage;
