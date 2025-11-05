from django.db import models


class Project(models.Model):
    """Portfolio projects"""

    tag = models.CharField(
        max_length=100,
        help_text="Project category/tag (e.g., 'Conversational AI', 'Computer Vision')",
    )
    title = models.CharField(max_length=200, help_text="Project title")
    subtitle = models.CharField(
        max_length=200, blank=True, help_text="Project subtitle (optional)"
    )
    desc = models.TextField(help_text="Short description/summary of the project")
    img = models.ImageField(
        upload_to="projects/", help_text="Main/featured image for the project"
    )
    href = models.URLField(
        blank=True, null=True, help_text="Project URL/link (optional)"
    )
    order = models.IntegerField(
        default=0, help_text="Display order (lower appears first)"
    )
    is_active = models.BooleanField(
        default=True, help_text="Whether this project should be displayed"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    """Additional images and videos for a project"""

    MEDIA_TYPE_CHOICES = [
        ("image", "Image"),
        ("video", "Video"),
    ]

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="images",
        help_text="The project this image/video belongs to",
    )
    image = models.ImageField(
        upload_to="projects/images/",
        blank=True,
        null=True,
        help_text="Project image (optional if video is provided)",
    )
    video = models.FileField(
        upload_to="projects/videos/",
        blank=True,
        null=True,
        help_text="Project video (optional if image is provided)",
    )
    media_type = models.CharField(
        max_length=10,
        choices=MEDIA_TYPE_CHOICES,
        default="image",
        help_text="Type of media (image or video)",
    )
    order = models.IntegerField(
        default=0, help_text="Display order (lower appears first)"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "created_at"]
        verbose_name = "Project Media"
        verbose_name_plural = "Project Media"

    def __str__(self):
        media_type = self.media_type.capitalize()
        return f"{self.project.title} - {media_type} {self.order + 1}"

    def clean(self):
        from django.core.exceptions import ValidationError

        if not self.image and not self.video:
            raise ValidationError("Either image or video must be provided.")
        if self.image and self.video:
            raise ValidationError(
                "Cannot have both image and video. Please choose one."
            )


class ProjectParagraph(models.Model):
    """Paragraphs with title and content for project details"""

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="paragraphs",
        help_text="The project this paragraph belongs to",
    )
    title = models.CharField(
        max_length=200, help_text="Paragraph title (e.g., 'Overview', 'Key Features')"
    )
    content = models.TextField(
        help_text="Paragraph content (supports **bold** formatting and lists)"
    )
    order = models.IntegerField(
        default=0, help_text="Display order (lower appears first)"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "created_at"]
        verbose_name = "Project Paragraph"
        verbose_name_plural = "Project Paragraphs"

    def __str__(self):
        return f"{self.project.title} - {self.title}"
