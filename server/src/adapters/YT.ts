import { youtube } from "@googleapis/youtube";
import { YOUTUBE_API_KEY } from "@/const";
import { AccessEnv, Logger } from "@/helpers";

export default class YT {
    private yt;

    constructor() {
        const key = AccessEnv.getInstance().get(YOUTUBE_API_KEY);
        if (!key) {
            Logger.getLogger().error("YOUTUBE_API_KEY env variable missing");
            process.exit(1); // server won't start without this key as it is mandatory
        }
        this.yt = youtube({
            version: 'v3',
            auth: key
        });
    }

    async fetch(q: string): Promise<any> {
        const response = await this.yt.search.list({
            part: ['snippet'],
            q,
            maxResults: 3,
            type: ['video'],
            order: 'relevance',
            videoDuration: 'medium'
        });
        return response?.data?.items?.map((item: any) => ({
            title: item?.snippet?.title,
            description: item?.snippet?.description,
            url: `https://www.youtube.com/watch?v=${item?.id?.videoId}`,
            channel_title: item?.snippet?.channelTitle,
            thumbnail: item?.snippet?.thumbnails?.high,
        })) || [];
    }
}