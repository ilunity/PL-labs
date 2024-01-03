from parser.utils.parsers.parser import NewsParser


def find_news(document):
    return document.find_all('section', 'story-wrapper')


def search_title(news_element):
    return news_element.find('p', 'indicate-hover')


def search_content(news_element):
    return news_element.find('p', 'summary-class')


def search_url(news_element):
    return news_element.find('a')


new_york_time_config = {
    'news_query': find_news,
    'title_query': search_title,
    'content_query': search_content,
    'url_query': search_url,
}

NYT_PARSER_NAME = 'NYT'
NYT_parser = NewsParser('https://www.nytimes.com/', new_york_time_config, NYT_PARSER_NAME)
