from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Plan
from .serializers import PlanSerializer


# Helper function for error responses
def error_response(message, status=400):
    return JsonResponse({"success": False, "message": message}, status=status)


# Helper function for success responses
def success_response(data, message="Success", status=200):
    return JsonResponse(
        {"success": True, "message": message, "data": data}, status=status
    )


# ==================== PLAN VIEWS ====================


@api_view(["GET"])
def plan_list(request):
    """Get all plans (AllowAny)"""
    try:
        plans = Plan.objects.filter(is_active=True)
        serializer = PlanSerializer(plans, many=True, context={"request": request})
        return success_response(serializer.data, "Plans retrieved successfully")
    except Exception as e:
        return error_response(f"Error: {str(e)}", 500)


@api_view(["GET"])
def plan_detail(request, pk):
    """Get single plan (AllowAny)"""
    try:
        plan = Plan.objects.get(pk=pk, is_active=True)
        serializer = PlanSerializer(plan, context={"request": request})
        return success_response(serializer.data, "Plan retrieved successfully")
    except Plan.DoesNotExist:
        return error_response("Plan not found", 404)
    except Exception as e:
        return error_response(f"Error: {str(e)}", 500)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def plan_create(request):
    """Create plan (Authenticated)"""
    try:
        serializer = PlanSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return success_response(serializer.data, "Plan created successfully", 201)
        return error_response(serializer.errors, 400)
    except Exception as e:
        return error_response(f"Error: {str(e)}", 500)


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def plan_update(request, pk):
    """Update plan (Authenticated)"""
    try:
        plan = Plan.objects.get(pk=pk)
        serializer = PlanSerializer(
            plan, data=request.data, partial=True, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return success_response(serializer.data, "Plan updated successfully")
        return error_response(serializer.errors, 400)
    except Plan.DoesNotExist:
        return error_response("Plan not found", 404)
    except Exception as e:
        return error_response(f"Error: {str(e)}", 500)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def plan_delete(request, pk):
    """Delete plan (Authenticated)"""
    try:
        plan = Plan.objects.get(pk=pk)
        plan.delete()
        return success_response(None, "Plan deleted successfully")
    except Plan.DoesNotExist:
        return error_response("Plan not found", 404)
    except Exception as e:
        return error_response(f"Error: {str(e)}", 500)
