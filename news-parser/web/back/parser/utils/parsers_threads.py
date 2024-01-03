from threading import Thread

from parser.utils.parsers.los_angeles_post_parser import LAP_parser
from parser.utils.parsers.new_york_times_parser import NYT_parser
from parser.utils.parsers.washington_post_parser import WP_parser

parsers = [WP_parser, NYT_parser, LAP_parser]
threads = []


def start_parsers_threads(queue, stop_parsing_event):
    for parser in parsers:
        thread = Thread(target=parser.start_parser, args=(queue, stop_parsing_event,), daemon=True)
        thread.start()
        threads.append(thread)
