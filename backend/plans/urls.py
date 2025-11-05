from django.urls import path
from . import views

urlpatterns = [
    # Plan URLs - 5 APIs
    path("", views.plan_list, name="plan-list"),
    path("<int:pk>/", views.plan_detail, name="plan-detail"),
    path("create/", views.plan_create, name="plan-create"),
    path("<int:pk>/update/", views.plan_update, name="plan-update"),
    path("<int:pk>/delete/", views.plan_delete, name="plan-delete"),
]
