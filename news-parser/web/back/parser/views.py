from django.http import JsonResponse
from parser.utils.news_store import news_store


def index(request):
    return JsonResponse(news_store)
