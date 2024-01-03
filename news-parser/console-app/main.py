import time
from queue import Queue, Empty
from threading import Thread, Event
from parsers.washington_post_parser import WP_parser, WP_PARSER_NAME
from parsers.new_york_times_parser import NYT_parser, NYT_PARSER_NAME

def consumer(queue, callback):
    while True:
        try:
            item = queue.get(block=False)
            callback(item)
        except Empty:
            time.sleep(0.5)
            continue

if __name__ == "__main__":
    parsers = [WP_parser, NYT_parser]
    news_store = {
        WP_PARSER_NAME: [],
        NYT_PARSER_NAME: []
    }
    threads = []
    queue = Queue()
    stop_parsing_event = Event()


    def start_parser(parser):
        thread = Thread(target=parser.start_parser, args=(queue, stop_parsing_event,), daemon=True)
        thread.start()
        threads.append(thread)


    for parser in parsers:
        start_parser(parser)

    def handleQueueItemReceive(item):
        parser_name = item['parser_name']
        parse_result = item['result']

        news_store[parser_name].append(parse_result)
        news_store[parser_name].extend(parse_result)

        print(news_store)


    try:
        consumer(queue, handleQueueItemReceive)
    except KeyboardInterrupt:
        print("Program is ending")
        stop_parsing_event.set()

        for thread in threads:
            thread.join()
