from django.contrib import admin
from .models import About, ResumeItem, Service, Skill, Testimonial, SocialMediaLink


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'email', 'location', 'has_cv', 'created_at']
    search_fields = ['name', 'title', 'email']
    list_filter = ['created_at', 'updated_at']
    
    def has_cv(self, obj):
        """Display whether CV is uploaded"""
        return bool(obj.cv)
    has_cv.short_description = 'CV Uploaded'
    has_cv.boolean = True


@admin.register(ResumeItem)
class ResumeItemAdmin(admin.ModelAdmin):
    list_display = ['role', 'organization', 'type', 'period', 'order']
    list_filter = ['type', 'created_at']
    search_fields = ['role', 'organization']
    ordering = ['order', '-created_at']


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'order', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title']
    ordering = ['order', 'created_at']


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_active', 'order']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name']
    ordering = ['order', 'name']


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'is_active', 'order', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'quote']
    ordering = ['order', 'created_at']


@admin.register(SocialMediaLink)
class SocialMediaLinkAdmin(admin.ModelAdmin):
    list_display = ['platform', 'url', 'is_active', 'order']
    list_filter = ['platform', 'is_active', 'created_at']
    search_fields = ['platform', 'url']
    ordering = ['order', 'platform']
