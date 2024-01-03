import time
from queue import Queue, Empty
from threading import Thread, Event
from parsers.washington_post_parser import WP_parser, WP_PARSER_NAME
from parsers.new_york_times_parser import NYT_parser, NYT_PARSER_NAME
from parsers.los_angeles_post_parser import LAP_parser, LAP_PARSER_NAME


def consumer(queue, callback):
    while True:
        try:
            item = queue.get(block=False)
            callback(item)
        except Empty:
            time.sleep(0.5)
            continue


parser_type_2_name = {
    WP_PARSER_NAME: "Washington Post",
    NYT_PARSER_NAME: "New York Time",
    LAP_PARSER_NAME: "Los Angeles Post"
}


def print_news_item(item):
    print('Title:', item['title'], sep=' ')
    print(item['content'], end='\n')
    print('-' * 20)


if __name__ == "__main__":
    queue = Queue()
    stop_parsing_event = Event()

    parsers = [WP_parser, NYT_parser, LAP_parser]
    threads = []


    def start_parser(parser):
        thread = Thread(target=parser.start_parser, args=(queue, stop_parsing_event), daemon=True)
        thread.start()
        threads.append(thread)


    for parser in parsers:
        start_parser(parser)


    def handleQueueItemReceive(item):
        magazine_name = parser_type_2_name[item['parser_name']]

        print()
        print('-' * 50, magazine_name, '-' * 50, sep=' ')

        result = item['result']
        for news_item in result:
            print_news_item(news_item)


    try:
        consumer(queue, handleQueueItemReceive)
    except KeyboardInterrupt:
        print("Program is ending")
        stop_parsing_event.set()

        for thread in threads:
            thread.join()
