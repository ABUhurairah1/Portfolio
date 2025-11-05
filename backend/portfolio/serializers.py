from rest_framework import serializers
from .models import (
    About, ResumeItem, Service, Skill, Testimonial, SocialMediaLink
)


class AboutSerializer(serializers.ModelSerializer):
    cv = serializers.FileField(required=False, allow_null=True)
    
    def to_internal_value(self, data):
        # Remove cv field if it's a string (existing URL from frontend)
        if hasattr(data, 'get') and data.get('cv') and isinstance(data.get('cv'), str):
            data = data.copy()
            if 'cv' in data:
                del data['cv']
        return super().to_internal_value(data)
    
    class Meta:
        model = About
        fields = '__all__'


class ResumeItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeItem
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)
    
    def to_internal_value(self, data):
        # Remove image field if it's a string (existing URL from frontend)
        if hasattr(data, 'get') and data.get('image') and isinstance(data.get('image'), str):
            data = data.copy()
            if 'image' in data:
                del data['image']
        return super().to_internal_value(data)
    
    class Meta:
        model = Service
        fields = '__all__'


class SkillSerializer(serializers.ModelSerializer):
    image = serializers.FileField(required=False, allow_null=True)
    
    def to_internal_value(self, data):
        # Remove image field if it's a string (existing URL from frontend)
        if hasattr(data, 'get') and data.get('image') and isinstance(data.get('image'), str):
            data = data.copy()
            if 'image' in data:
                del data['image']
        return super().to_internal_value(data)
    
    class Meta:
        model = Skill
        fields = '__all__'


class TestimonialSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(required=False, allow_null=True)
    
    def to_internal_value(self, data):
        # Remove avatar field if it's a string (existing URL from frontend)
        if hasattr(data, 'get') and data.get('avatar') and isinstance(data.get('avatar'), str):
            data = data.copy()
            if 'avatar' in data:
                del data['avatar']
        return super().to_internal_value(data)
    
    class Meta:
        model = Testimonial
        fields = '__all__'


class SocialMediaLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMediaLink
        fields = '__all__'

