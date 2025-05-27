from rest_framework import serializers
from .models import Article
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class ArticleSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True) 
    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'created_at', 'updated_at', 'author']
        read_only_fields = ['author']

    def create(self, validated_data):
        return Article.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance

    def delete(self, instance):
        instance.delete()
        # return instance
    


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

        extra_kwargs = {
            'password': {
                'write_only': True,
                'required': True
                }
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user