import datetime
import time
from threading import Timer

import requests
from bs4 import BeautifulSoup


class NewsParser:
    parsed_titles = []
    queue = None

    def __init__(self, url, config, name=None):
        if name is None:
            name = url

        self.url = url
        self.config = config
        self.name = name

    def parse(self):
        try:
            response = requests.get(self.url)
            print('Log [Info] ({0}): success response from: {1}.'.format(self.name, self.url))
        except Exception as e:
            print('Log [Error] ({0}): {1}.'.format(self.name, e))
            return []

        soap = BeautifulSoup(response.text, 'html.parser')
        news_html = self.config['news_query'](soap)
        # print('Log [Info] ({0}): news elements found.'.format(self.name))

        news = []
        for news_element in news_html:
            try:
                title = self.config['title_query'](news_element).string
                content = self.config['content_query'](news_element).string

                if title in self.parsed_titles:
                    continue

                news.append({
                    "title": title,
                    "content": content
                })
                self.parsed_titles.append(title)
            except AttributeError:
                pass

        # print('Log [Info] ({0}): success parsing.'.format(self.name))
        return news

    def start_parser(self, queue, stop_event, delay=300):
        print('Log [Info] ({0}): parsing started.'.format(self.name))
        self.queue = queue

        target = datetime.datetime.now()

        while not stop_event.is_set():
            delta = target - datetime.datetime.now()

            if delta <= datetime.timedelta(0):
                parse_result = self.parse()
                self.queue.put({
                    'parser_name': self.name,
                    'result': parse_result
                })

                target = datetime.datetime.now() + datetime.timedelta(seconds=delay)

            time.sleep(5)

    def stop_parser(self):
        print('Log [Info] ({0}): parsing has been stopped.'.format(self.name))
        self.queue = None
