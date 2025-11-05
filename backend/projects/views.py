from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Project
from .serializers import ProjectSerializer, ProjectCreateSerializer


# Helper function for error responses
def error_response(message, status=400):
    return JsonResponse({"success": False, "message": message}, status=status)


# Helper function for success responses
def success_response(data, message="Success", status=200):
    return JsonResponse(
        {"success": True, "message": message, "data": data}, status=status
    )


# ==================== PROJECT VIEWS ====================


@csrf_exempt
@api_view(["GET"])
@permission_classes([AllowAny])
def project_list(request):
    """Get all projects (AllowAny)"""
    try:
        projects = Project.objects.filter(is_active=True)
        serializer = ProjectSerializer(
            projects, many=True, context={"request": request}
        )
        return success_response(serializer.data, "Projects retrieved successfully")
    except Exception as e:
        return error_response(f"Error: {str(e)}", 500)


@csrf_exempt
@api_view(["GET"])
@permission_classes([AllowAny])
def project_detail(request, pk):
    """Get single project (AllowAny)"""
    try:
        project = Project.objects.get(pk=pk, is_active=True)
        serializer = ProjectSerializer(project, context={"request": request})
        return success_response(serializer.data, "Project retrieved successfully")
    except Project.DoesNotExist:
        return error_response("Project not found", 404)
    except Exception as e:
        return error_response(f"Error: {str(e)}", 500)


@csrf_exempt
@api_view(["POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def project_create(request):
    """Create project (Authenticated)"""
    try:
        serializer = ProjectCreateSerializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            # Return full project data with nested relations
            project = Project.objects.get(pk=serializer.instance.pk)
            full_serializer = ProjectSerializer(project, context={"request": request})
            return success_response(
                full_serializer.data, "Project created successfully", 201
            )
        return error_response(serializer.errors, 400)
    except Exception as e:
        return error_response(f"Error: {str(e)}", 500)


@csrf_exempt
@api_view(["PUT", "PATCH"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def project_update(request, pk):
    """Update project (Authenticated)"""
    try:
        project = Project.objects.get(pk=pk)
        serializer = ProjectCreateSerializer(
            project, data=request.data, partial=True, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            # Return full project data with nested relations
            updated_project = Project.objects.get(pk=project.pk)
            full_serializer = ProjectSerializer(
                updated_project, context={"request": request}
            )
            return success_response(
                full_serializer.data, "Project updated successfully"
            )
        return error_response(serializer.errors, 400)
    except Project.DoesNotExist:
        return error_response("Project not found", 404)
    except Exception as e:
        return error_response(f"Error: {str(e)}", 500)


@csrf_exempt
@api_view(["DELETE"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def project_delete(request, pk):
    """Delete project (Authenticated)"""
    try:
        project = Project.objects.get(pk=pk)
        project.delete()
        return success_response(None, "Project deleted successfully")
    except Project.DoesNotExist:
        return error_response("Project not found", 404)
    except Exception as e:
        return error_response(f"Error: {str(e)}", 500)
