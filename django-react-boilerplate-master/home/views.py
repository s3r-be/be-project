from background_task import background
from django.shortcuts import render


@background(schedule=1)
def hello():
    print('test')


def index(request):
    hello()
    return render(request, 'index.html', {})
