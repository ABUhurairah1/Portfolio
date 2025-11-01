from django.urls import path
from . import views

urlpatterns = [
    # About URLs
    path('about/', views.about_list, name='about-list'),
    path('about/<int:pk>/', views.about_detail, name='about-detail'),
    path('about/create/', views.about_create, name='about-create'),
    path('about/<int:pk>/update/', views.about_update, name='about-update'),
    path('about/<int:pk>/delete/', views.about_delete, name='about-delete'),
    
    # Resume URLs
    path('resume/', views.resume_list, name='resume-list'),
    path('resume/<int:pk>/', views.resume_detail, name='resume-detail'),
    path('resume/create/', views.resume_create, name='resume-create'),
    path('resume/<int:pk>/update/', views.resume_update, name='resume-update'),
    path('resume/<int:pk>/delete/', views.resume_delete, name='resume-delete'),
    
    # Service URLs
    path('service/', views.service_list, name='service-list'),
    path('service/<int:pk>/', views.service_detail, name='service-detail'),
    path('service/create/', views.service_create, name='service-create'),
    path('service/<int:pk>/update/', views.service_update, name='service-update'),
    path('service/<int:pk>/delete/', views.service_delete, name='service-delete'),
    
    # Skill URLs
    path('skill/', views.skill_list, name='skill-list'),
    path('skill/<int:pk>/', views.skill_detail, name='skill-detail'),
    path('skill/create/', views.skill_create, name='skill-create'),
    path('skill/<int:pk>/update/', views.skill_update, name='skill-update'),
    path('skill/<int:pk>/delete/', views.skill_delete, name='skill-delete'),
    
    # Testimonial URLs
    path('testimonial/', views.testimonial_list, name='testimonial-list'),
    path('testimonial/<int:pk>/', views.testimonial_detail, name='testimonial-detail'),
    path('testimonial/create/', views.testimonial_create, name='testimonial-create'),
    path('testimonial/<int:pk>/update/', views.testimonial_update, name='testimonial-update'),
    path('testimonial/<int:pk>/delete/', views.testimonial_delete, name='testimonial-delete'),
    
    # Social Media URLs
    path('social-media/', views.social_media_list, name='social-media-list'),
    path('social-media/<int:pk>/', views.social_media_detail, name='social-media-detail'),
    path('social-media/create/', views.social_media_create, name='social-media-create'),
    path('social-media/<int:pk>/update/', views.social_media_update, name='social-media-update'),
    path('social-media/<int:pk>/delete/', views.social_media_delete, name='social-media-delete'),
]