from rest_framework import serializers
from .models import Project, ProjectImage, ProjectParagraph


class ProjectImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)
    video = serializers.FileField(required=False, allow_null=True)

    def to_internal_value(self, data):
        # Remove image/video field if it's a string (existing URL from frontend)
        if hasattr(data, "get"):
            data = data.copy()
            if data.get("image") and isinstance(data.get("image"), str):
                if "image" in data:
                    del data["image"]
            if data.get("video") and isinstance(data.get("video"), str):
                if "video" in data:
                    del data["video"]
        return super().to_internal_value(data)

    class Meta:
        model = ProjectImage
        fields = "__all__"
        read_only_fields = ("created_at",)


class ProjectParagraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectParagraph
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class ProjectSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)
    paragraphs = ProjectParagraphSerializer(many=True, read_only=True)
    img = serializers.ImageField(required=False, allow_null=True)
    # Primary image for list view (first image from images array or main img)
    primary_image = serializers.SerializerMethodField()

    def get_primary_image(self, obj):
        """Get primary image - first image from images array, or fallback to main img"""
        request = self.context.get("request")
        if obj.images.exists():
            first_image = obj.images.first()
            if first_image.image:
                if request:
                    return request.build_absolute_uri(first_image.image.url)
                return first_image.image.url
            elif first_image.video:
                if request:
                    return request.build_absolute_uri(first_image.video.url)
                return first_image.video.url
        # Fallback to main img
        if obj.img:
            if request:
                return request.build_absolute_uri(obj.img.url)
            return obj.img.url
        return None

    def to_internal_value(self, data):
        # Remove img field if it's a string (existing URL from frontend)
        if (
            hasattr(data, "get")
            and data.get("img")
            and isinstance(data.get("img"), str)
        ):
            data = data.copy()
            if "img" in data:
                del data["img"]
        return super().to_internal_value(data)

    class Meta:
        model = Project
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at", "primary_image")


class ProjectCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating projects with nested images/videos and paragraphs"""

    images = ProjectImageSerializer(many=True, required=False)
    paragraphs = ProjectParagraphSerializer(many=True, required=False)
    img = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Project
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")

    def validate_images(self, value):
        """Validate that each media item has either image or video"""
        for img_data in value:
            has_image = img_data.get("image") is not None
            has_video = img_data.get("video") is not None

            if not has_image and not has_video:
                raise serializers.ValidationError(
                    "Each media item must have either an image or video."
                )
            # Auto-set media_type based on what's provided
            if has_image:
                img_data["media_type"] = "image"
            elif has_video:
                img_data["media_type"] = "video"
        return value

    def create(self, validated_data):
        images_data = validated_data.pop("images", [])
        paragraphs_data = validated_data.pop("paragraphs", [])

        project = Project.objects.create(**validated_data)

        # Create related images/videos
        for media_data in images_data:
            # Set media_type if not already set
            if "media_type" not in media_data:
                if media_data.get("image"):
                    media_data["media_type"] = "image"
                elif media_data.get("video"):
                    media_data["media_type"] = "video"
            ProjectImage.objects.create(project=project, **media_data)

        # Create related paragraphs
        for paragraph_data in paragraphs_data:
            ProjectParagraph.objects.create(project=project, **paragraph_data)

        return project

    def update(self, instance, validated_data):
        images_data = validated_data.pop("images", None)
        paragraphs_data = validated_data.pop("paragraphs", None)

        # Update project fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update images/videos if provided
        if images_data is not None:
            # Delete existing images/videos
            instance.images.all().delete()
            # Create new images/videos
            for media_data in images_data:
                # Set media_type if not already set
                if "media_type" not in media_data:
                    if media_data.get("image"):
                        media_data["media_type"] = "image"
                    elif media_data.get("video"):
                        media_data["media_type"] = "video"
                ProjectImage.objects.create(project=instance, **media_data)

        # Update paragraphs if provided
        if paragraphs_data is not None:
            # Delete existing paragraphs
            instance.paragraphs.all().delete()
            # Create new paragraphs
            for paragraph_data in paragraphs_data:
                ProjectParagraph.objects.create(project=instance, **paragraph_data)

        return instance
