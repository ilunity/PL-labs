from threading import Thread


def consumer(queue, callback, stop_event):
    while not stop_event.is_set():
        item = queue.get()
        callback(item)


def news_consumer(queue, news_store, stop_parsing_event):
    def handleQueueItemReceive(item):
        parser_name = item['parser_name']
        parse_result = item['result']

        news_store[parser_name].extend(parse_result)

    consumer(queue, handleQueueItemReceive, stop_parsing_event)


def start_news_consumer_thread(queue, news_store, stop_parsing_event):
    update_store_thread = Thread(target=news_consumer, args=(queue, news_store, stop_parsing_event,), daemon=True)
    update_store_thread.start()
