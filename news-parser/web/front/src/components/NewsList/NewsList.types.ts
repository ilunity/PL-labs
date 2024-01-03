import {NEWS_TYPES, ParserNews} from "../../utils/api.types.ts";

export interface NewsListProps {
    news: ParserNews;
    newsType: `${NEWS_TYPES}`
}
