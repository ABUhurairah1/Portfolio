from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
import json
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User


@csrf_exempt
@api_view(['POST'])
@authentication_classes([])  # No auth required for login (AllowAny is default in settings)
def admin_login(request):
    """
    Admin login API endpoint
    Accepts: { "email": "admin@example.com", "password": "password123" }
    Returns: JWT tokens and user info if successful
    """
    try:
        data = json.loads(request.body)
        email = data.get('email', '').strip()
        password = data.get('password', '')

        if not email or not password:
            return JsonResponse({
                'success': False,
                'message': 'Email and password are required'
            }, status=400)

        # Get user by email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({
                'success': False,
                'message': 'Invalid email or password'
            }, status=401)

        # Check if user is active
        if not user.is_active:
            return JsonResponse({
                'success': False,
                'message': 'Account is inactive. Please contact administrator.'
            }, status=403)

        # Check if user is admin
        if not user.is_admin:
            return JsonResponse({
                'success': False,
                'message': 'Access denied. Admin privileges required.'
            }, status=403)

        # Verify password
        if not user.check_password(password):
            return JsonResponse({
                'success': False,
                'message': 'Invalid email or password'
            }, status=401)

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return JsonResponse({
            'success': True,
            'message': 'Login successful',
            'data': {
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'username': user.username,
                    'is_admin': user.is_admin,
                    'is_active': user.is_active
                },
                'tokens': {
                    'access': str(refresh.access_token),
                    'refresh': str(refresh)
                }
            }
        }, status=200)

    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'message': 'Invalid JSON format'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': f'An error occurred: {str(e)}'
        }, status=500)


@csrf_exempt
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def change_password(request):
    """
    Change password API endpoint
    Requires: JWT authentication
    Accepts: { "current_password": "oldpass", "new_password": "newpass" }
    Returns: Success message if password changed successfully
    """
    try:
        data = json.loads(request.body)
        current_password = data.get('current_password', '')
        new_password = data.get('new_password', '')

        if not current_password or not new_password:
            return JsonResponse({
                'success': False,
                'message': 'Current password and new password are required'
            }, status=400)

        # Validate new password length
        if len(new_password) < 8:
            return JsonResponse({
                'success': False,
                'message': 'New password must be at least 8 characters long'
            }, status=400)

        # Get authenticated user
        user = request.user

        # Verify current password
        if not user.check_password(current_password):
            return JsonResponse({
                'success': False,
                'message': 'Current password is incorrect'
            }, status=401)

        # Set new password
        user.set_password(new_password)
        user.save()

        return JsonResponse({
            'success': True,
            'message': 'Password changed successfully'
        }, status=200)

    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'message': 'Invalid JSON format'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': f'An error occurred: {str(e)}'
        }, status=500)