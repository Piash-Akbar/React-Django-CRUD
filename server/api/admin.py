from django.contrib import admin

# Register your models here.
from .models import Article

# admin.site.register(Article)
@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'created_at', 'updated_at')
    list_filter = ('title','created_at', 'updated_at')
    search_fields = ('title', 'content')
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'
    list_per_page = 10
    list_max_show_all = 100
    list_editable = ('content',)