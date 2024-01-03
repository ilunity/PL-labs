from queue import Queue
from threading import Event

from parser.utils.parsers.los_angeles_post_parser import LAP_PARSER_NAME
from parser.utils.parsers.new_york_times_parser import NYT_PARSER_NAME
from parser.utils.parsers.washington_post_parser import WP_PARSER_NAME

from parser.utils.news_consumer_thread import start_news_consumer_thread
from parser.utils.parsers_threads import start_parsers_threads

news_store = {
    WP_PARSER_NAME: [],
    NYT_PARSER_NAME: [],
    LAP_PARSER_NAME: []
}

queue = Queue()
stop_parsing_event = Event()

start_news_consumer_thread(queue, news_store, stop_parsing_event)
start_parsers_threads(queue, stop_parsing_event)
