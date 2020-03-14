from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path

from . import routing
from . import consumers

application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket': AuthMiddlewareStack(
        URLRouter(
            [
                re_path(r'ws/chat/(?P<room_name>\w+)/$',
                        consumers.ChatConsumer),
            ]
        )
    ),
})
