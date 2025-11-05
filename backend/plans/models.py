from django.db import models


class Plan(models.Model):
    """Pricing plans"""

    title = models.CharField(
        max_length=200, help_text="Plan title (e.g., 'Standard Plan', 'Premium Plan')"
    )
    features = models.JSONField(
        default=list,
        help_text="List of features (e.g., ['60 keywords', '6,000 monthly website visitors'])",
    )
    price = models.CharField(max_length=50, help_text="Price (e.g., '$29', '$99')")
    unit = models.CharField(
        max_length=50,
        default="/per hour",
        help_text="Price unit (e.g., '/per hour', '/per month')",
    )
    active = models.BooleanField(
        default=False,
        help_text="Whether this plan is active/selected (for tab display)",
    )
    order = models.IntegerField(
        default=0, help_text="Display order (lower appears first)"
    )
    is_active = models.BooleanField(
        default=True, help_text="Whether this plan should be displayed"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "created_at"]
        verbose_name = "Plan"
        verbose_name_plural = "Plans"

    def __str__(self):
        return self.title
