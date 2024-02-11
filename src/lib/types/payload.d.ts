export namespace Payload {
    type ImageProperties = {
        filename: string;
        filesize: number;
        height: number;
        mimeType: string;
        url: string;
        width: number;
    }

    type Image = ImageProperties & {
        id: string;
        sizes: {
            [key: string]: ImageProperties;
        },
    }

    namespace Globals {
        type Home = {
            general: {
                title: string;
            },
            hero: {
                text_html: string;
                image: Image;
            }
        }
    }
}