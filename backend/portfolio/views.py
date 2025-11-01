from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import About, ResumeItem, Service, Skill, Testimonial, SocialMediaLink
from .serializers import (
    AboutSerializer, ResumeItemSerializer, ServiceSerializer,
    SkillSerializer, TestimonialSerializer, SocialMediaLinkSerializer
)


# Helper function for error responses
def error_response(message, status=400):
    return JsonResponse({'success': False, 'message': message}, status=status)


# Helper function for success responses
def success_response(data, message='Success', status=200):
    return JsonResponse({'success': True, 'message': message, 'data': data}, status=status)


# ==================== ABOUT VIEWS ====================

@csrf_exempt
@api_view(['GET'])
def about_list(request):
    """Get all about information (AllowAny)"""
    try:
        about_items = About.objects.all().first()  # Get first object only
        if about_items:
            serializer = AboutSerializer(about_items, context={'request': request})
            return success_response(serializer.data, 'About information retrieved successfully')
        else:
            return success_response(None, 'No about information found')
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['GET'])
def about_detail(request, pk):
    """Get single about information (AllowAny)"""
    try:
        about = About.objects.get(pk=pk)
        serializer = AboutSerializer(about, context={'request': request})
        return success_response(serializer.data)
    except About.DoesNotExist:
        return error_response('About information not found', 404)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def about_create(request):
    """Create about information (Authenticated)"""
    try:
        serializer = AboutSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return success_response(serializer.data, 'About created successfully', 201)
        return error_response(serializer.errors, 400)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def about_update(request, pk):
    """Update about information (Authenticated)"""
    try:
        about = About.objects.get(pk=pk)
        serializer = AboutSerializer(about, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return success_response(serializer.data, 'About updated successfully')
        return error_response(serializer.errors, 400)
    except About.DoesNotExist:
        return error_response('About information not found', 404)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def about_delete(request, pk):
    """Delete about information (Authenticated)"""
    try:
        about = About.objects.get(pk=pk)
        about.delete()
        return success_response(None, 'About deleted successfully')
    except About.DoesNotExist:
        return error_response('About information not found', 404)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


# ==================== RESUME ITEM VIEWS ====================

@csrf_exempt
@api_view(['GET'])
def resume_list(request):
    """Get all resume items (AllowAny)"""
    try:
        resume_items = ResumeItem.objects.all()
        serializer = ResumeItemSerializer(resume_items, many=True, context={'request': request})
        return success_response(serializer.data, 'Resume items retrieved successfully')
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['GET'])
def resume_detail(request, pk):
    """Get single resume item (AllowAny)"""
    try:
        resume = ResumeItem.objects.get(pk=pk)
        serializer = ResumeItemSerializer(resume, context={'request': request})
        return success_response(serializer.data)
    except ResumeItem.DoesNotExist:
        return error_response('Resume item not found', 404)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def resume_create(request):
    """Create resume item (Authenticated)"""
    try:
        serializer = ResumeItemSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return success_response(serializer.data, 'Resume item created successfully', 201)
        return error_response(serializer.errors, 400)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def resume_update(request, pk):
    """Update resume item (Authenticated)"""
    try:
        resume = ResumeItem.objects.get(pk=pk)
        serializer = ResumeItemSerializer(resume, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return success_response(serializer.data, 'Resume item updated successfully')
        return error_response(serializer.errors, 400)
    except ResumeItem.DoesNotExist:
        return error_response('Resume item not found', 404)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def resume_delete(request, pk):
    """Delete resume item (Authenticated)"""
    try:
        resume = ResumeItem.objects.get(pk=pk)
        resume.delete()
        return success_response(None, 'Resume item deleted successfully')
    except ResumeItem.DoesNotExist:
        return error_response('Resume item not found', 404)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


# ==================== SERVICE VIEWS ====================

@csrf_exempt
@api_view(['GET'])
def service_list(request):
    """Get all services (AllowAny)"""
    try:
        services = Service.objects.filter(is_active=True)
        serializer = ServiceSerializer(services, many=True, context={'request': request})
        return success_response(serializer.data, 'Services retrieved successfully')
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['GET'])
def service_detail(request, pk):
    """Get single service (AllowAny)"""
    try:
        service = Service.objects.get(pk=pk)
        serializer = ServiceSerializer(service, context={'request': request})
        return success_response(serializer.data)
    except Service.DoesNotExist:
        return error_response('Service not found', 404)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def service_create(request):
    """Create service (Authenticated)"""
    try:
        serializer = ServiceSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return success_response(serializer.data, 'Service created successfully', 201)
        return error_response(serializer.errors, 400)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def service_update(request, pk):
    """Update service (Authenticated)"""
    try:
        service = Service.objects.get(pk=pk)
        serializer = ServiceSerializer(service, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return success_response(serializer.data, 'Service updated successfully')
        return error_response(serializer.errors, 400)
    except Service.DoesNotExist:
        return error_response('Service not found', 404)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def service_delete(request, pk):
    """Delete service (Authenticated)"""
    try:
        service = Service.objects.get(pk=pk)
        service.delete()
        return success_response(None, 'Service deleted successfully')
    except Service.DoesNotExist:
        return error_response('Service not found', 404)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


# ==================== SKILL VIEWS ====================

@csrf_exempt
@api_view(['GET'])
def skill_list(request):
    """Get all skills (AllowAny)"""
    try:
        skills = Skill.objects.filter(is_active=True)
        serializer = SkillSerializer(skills, many=True, context={'request': request})
        return success_response(serializer.data, 'Skills retrieved successfully')
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['GET'])
def skill_detail(request, pk):
    """Get single skill (AllowAny)"""
    try:
        skill = Skill.objects.get(pk=pk)
        serializer = SkillSerializer(skill, context={'request': request})
        return success_response(serializer.data)
    except Skill.DoesNotExist:
        return error_response('Skill not found', 404)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def skill_create(request):
    """Create skill (Authenticated)"""
    try:
        serializer = SkillSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return success_response(serializer.data, 'Skill created successfully', 201)
        return error_response(serializer.errors, 400)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def skill_update(request, pk):
    """Update skill (Authenticated)"""
    try:
        print(request.data)
        skill = Skill.objects.get(pk=pk)
        serializer = SkillSerializer(skill, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return success_response(serializer.data, 'Skill updated successfully')
        return error_response(serializer.errors, 400)
    except Skill.DoesNotExist:
        return error_response('Skill not found', 404)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def skill_delete(request, pk):
    """Delete skill (Authenticated)"""
    try:
        skill = Skill.objects.get(pk=pk)
        skill.delete()
        return success_response(None, 'Skill deleted successfully')
    except Skill.DoesNotExist:
        return error_response('Skill not found', 404)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


# ==================== TESTIMONIAL VIEWS ====================

@csrf_exempt
@api_view(['GET'])
def testimonial_list(request):
    """Get all testimonials (AllowAny)"""
    try:
        testimonials = Testimonial.objects.filter(is_active=True)
        serializer = TestimonialSerializer(testimonials, many=True, context={'request': request})
        return success_response(serializer.data, 'Testimonials retrieved successfully')
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['GET'])
def testimonial_detail(request, pk):
    """Get single testimonial (AllowAny)"""
    try:
        testimonial = Testimonial.objects.get(pk=pk)
        serializer = TestimonialSerializer(testimonial, context={'request': request})
        return success_response(serializer.data)
    except Testimonial.DoesNotExist:
        return error_response('Testimonial not found', 404)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def testimonial_create(request):
    """Create testimonial (Authenticated)"""
    try:
        serializer = TestimonialSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return success_response(serializer.data, 'Testimonial created successfully', 201)
        return error_response(serializer.errors, 400)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def testimonial_update(request, pk):
    """Update testimonial (Authenticated)"""
    try:
        testimonial = Testimonial.objects.get(pk=pk)
        serializer = TestimonialSerializer(testimonial, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return success_response(serializer.data, 'Testimonial updated successfully')
        return error_response(serializer.errors, 400)
    except Testimonial.DoesNotExist:
        return error_response('Testimonial not found', 404)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def testimonial_delete(request, pk):
    """Delete testimonial (Authenticated)"""
    try:
        testimonial = Testimonial.objects.get(pk=pk)
        testimonial.delete()
        return success_response(None, 'Testimonial deleted successfully')
    except Testimonial.DoesNotExist:
        return error_response('Testimonial not found', 404)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


# ==================== SOCIAL MEDIA LINK VIEWS ====================

@csrf_exempt
@api_view(['GET'])
def social_media_list(request):
    """Get all social media links (AllowAny)"""
    try:
        links = SocialMediaLink.objects.filter(is_active=True)
        serializer = SocialMediaLinkSerializer(links, many=True, context={'request': request})
        return success_response(serializer.data, 'Social media links retrieved successfully')
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['GET'])
def social_media_detail(request, pk):
    """Get single social media link (AllowAny)"""
    try:
        link = SocialMediaLink.objects.get(pk=pk)
        serializer = SocialMediaLinkSerializer(link, context={'request': request})
        return success_response(serializer.data)
    except SocialMediaLink.DoesNotExist:
        return error_response('Social media link not found', 404)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def social_media_create(request):
    """Create social media link (Authenticated)"""
    try:
        serializer = SocialMediaLinkSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return success_response(serializer.data, 'Social media link created successfully', 201)
        return error_response(serializer.errors, 400)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def social_media_update(request, pk):
    """Update social media link (Authenticated)"""
    try:
        link = SocialMediaLink.objects.get(pk=pk)
        serializer = SocialMediaLinkSerializer(link, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return success_response(serializer.data, 'Social media link updated successfully')
        return error_response(serializer.errors, 400)
    except SocialMediaLink.DoesNotExist:
        return error_response('Social media link not found', 404)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)


@csrf_exempt
@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def social_media_delete(request, pk):
    """Delete social media link (Authenticated)"""
    try:
        link = SocialMediaLink.objects.get(pk=pk)
        link.delete()
        return success_response(None, 'Social media link deleted successfully')
    except SocialMediaLink.DoesNotExist:
        return error_response('Social media link not found', 404)
    except Exception as e:
        return error_response(f'Error: {str(e)}', 500)
