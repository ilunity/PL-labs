from parser.utils.parsers.parser import NewsParser


def find_news(document):
    return document.find_all(
        lambda tag:
        tag.has_attr('data-feature-id')
        and tag['data-feature-id'] == 'homepage/story'
    )


def search_title(news_element):
    headline = news_element.find('div', 'headline')
    return headline.find('span')


def search_content(news_element):
    headline = news_element.find('div', 'headline')
    return headline.next_sibling.find('span')


def search_url(news_element):
    return news_element.find('a')


washington_post_config = {
    'news_query': find_news,
    'title_query': search_title,
    'content_query': search_content,
    'url_query': search_url,
}

WP_PARSER_NAME = 'WP'
WP_parser = NewsParser('https://www.washingtonpost.com/', washington_post_config, WP_PARSER_NAME)
