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

    type Collection = {
        id: string;
        _status: 'published' | 'draft';
        createdAt: string;
        updatedAt: string;
    }

    type CollectionResponse<T extends Collection> = {
        docs: T[];
        totalDocs: number;
        limit: number;
        totalPages: number;
        page: number;
        pagingCounter: number;
        hasPrevPage: boolean;
        hasNextPage: boolean;
        prevPage: number | null;
        nextPage: number | null;
    }

    namespace Collections {
        type BlogPostings = Collection & {
            image: Image;
            title: string;
            abstract: string;
            slug: string;
            text_html: string;
        }
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

        type LegalNotice = {
            title: string;
            text_html: string;
        }
    }
}