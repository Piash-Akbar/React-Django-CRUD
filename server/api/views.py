# from server import api
from api.models import Article  
from api.serializer import ArticleSerializer
# from django.http import JsonResponse
# from rest_framework.parsers import JSONParser
# from rest_framework.decorators import api_view /
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.views import APIView as ApiView
# from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated
# from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.authentication import TokenAuthentication
from api.serializer import UserSerializer
from django.contrib.auth.models import User


###################There is Manny ways to create views#####################
#Class based views

class ArticleViewSet(ApiView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author = request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        article = Article.objects.get(pk=pk)
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        article = Article.objects.get(pk=pk)
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ArticleDetails(ApiView):
    def get(self, request, pk):
        article = Article.objects.get(pk=pk)
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    
    def put(self, request, pk):
        article = Article.objects.get(pk=pk)
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        article = Article.objects.get(pk=pk)
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer







'''

#Function based views

# @csrf_exempt
@api_view(['GET', 'POST', 'PUT','DELETE'])
def article_list(request):
    if request.method == 'GET':
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)
    

    elif request.method == 'POST':
        # data = JSONParser().parse(request)
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = ArticleSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    


# @csrf_exempt
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def article_details(request, pk):
    try:
        article = Article.objects.get(pk=pk)
    except Article.DoesNotExist:
        return Response({'message': 'The article does not exist'}, status=status.HTTP_404_NOT_FOUND)



    if request.method == 'GET':
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    


    elif request.method == 'PUT':
        # data = JSONParser().parse(request)
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        article.delete()
        return Response({'message': 'Article was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
'''