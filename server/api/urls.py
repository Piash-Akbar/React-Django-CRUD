# urls.py

from django.urls import path
# from .views import article_list, article_details
from .views import ArticleViewSet, ArticleDetails


urlpatterns = [
    path('articles/', ArticleViewSet.as_view()),
    path('articles/<int:pk>/', ArticleDetails.as_view()),




    # path('articles/<int:pk>/', article_details, name='article_details')
]

