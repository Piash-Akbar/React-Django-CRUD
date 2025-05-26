
from django.urls import path,include
# from .views import article_list, article_details
from .views import ArticleViewSet, ArticleDetails
from rest_framework import routers as default_routers
from api.views import UserView



router = default_routers.DefaultRouter()
router.register('users', UserView)



urlpatterns = [
    path('api/',include(router.urls)),
    path('articles/', ArticleViewSet.as_view()),
    path('articles/<int:pk>/', ArticleDetails.as_view()),




    # path('articles/<int:pk>/', article_details, name='article_details')
]

