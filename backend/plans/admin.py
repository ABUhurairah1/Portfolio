from django.contrib import admin
from .models import Plan


@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "price",
        "unit",
        "active",
        "is_active",
        "order",
        "created_at",
    ]
    list_filter = ["active", "is_active", "created_at"]
    search_fields = ["title", "price"]
    ordering = ["order", "created_at"]
    list_editable = ["active", "is_active", "order"]
