from parser.utils.parsers.parser import NewsParser


def find_news(document):
    return document.find_all('article', 'post-item')


def search_title(news_element):
    return news_element.find('h3', 'post-item-title').find('a')


def search_content(news_element):
    return news_element.find('div', 'post-item-excerpt').find('p')


los_angeles_post_config = {
    'news_query': find_news,
    'title_query': search_title,
    'content_query': search_content,
    'url_query': search_title,
}

LAP_PARSER_NAME = 'LAP'
LAP_parser = NewsParser('https://www.lapost.com/', los_angeles_post_config, LAP_PARSER_NAME)
