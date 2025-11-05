from django.db import models


class About(models.Model):
    """About section data"""
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200, help_text="Main title (e.g., 'AI Developer')")
    rotating_titles = models.JSONField(
        default=list,
        help_text="List of titles that rotate (e.g., ['AI Developer', 'Data Scientist', 'UI/UX Developer'])"
    )
    main_title = models.CharField(max_length=200, help_text="Main heading text")
    description = models.TextField()
    years_experience = models.DecimalField(max_digits=5, decimal_places=1, default=10)
    satisfied_clients = models.IntegerField(default=500)
    projects_completed = models.IntegerField(default=1000)
    email = models.EmailField()
    location = models.CharField(max_length=100)
    cv = models.FileField(upload_to='cv/', blank=True, null=True, help_text="CV/Resume PDF file")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "About Information"
        verbose_name_plural = "About Information"

    def __str__(self):
        return self.name


class ResumeItem(models.Model):
    """Education or Experience resume items"""
    RESUME_TYPE_CHOICES = [
        ('experience', 'Experience'),
        ('education', 'Education'),
    ]
    
    type = models.CharField(max_length=20, choices=RESUME_TYPE_CHOICES)
    role = models.CharField(max_length=200, help_text="Job title or degree name")
    organization = models.CharField(max_length=200, help_text="Company or university")
    period = models.CharField(max_length=50, help_text="e.g., '2020 - Present'")
    order = models.IntegerField(default=0, help_text="Display order (lower appears first)")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = "Resume Item"
        verbose_name_plural = "Resume Items"

    def __str__(self):
        return f"{self.role} at {self.organization}"


class Service(models.Model):
    """Services offered"""
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='services/', help_text="Service icon/image")
    order = models.IntegerField(default=0, help_text="Display order (lower appears first)")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'created_at']
        verbose_name = "Service"
        verbose_name_plural = "Services"

    def __str__(self):
        return self.title


class Skill(models.Model):
    """Skills/Technologies"""
    name = models.CharField(max_length=100)
    image = models.FileField(upload_to='skills/', help_text="Skill logo/icon (PNG, JPG, SVG, etc.)")
    order = models.IntegerField(default=0, help_text="Display order (lower appears first)")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'name']
        verbose_name = "Skill"
        verbose_name_plural = "Skills"

    def __str__(self):
        return self.name


class Testimonial(models.Model):
    """Client testimonials"""
    quote = models.TextField()
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200, help_text="Job title")
    avatar = models.ImageField(
        upload_to='testimonials/',
        blank=True,
        null=True,
        help_text="Client photo (optional)"
    )
    order = models.IntegerField(default=0, help_text="Display order (lower appears first)")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'created_at']
        verbose_name = "Testimonial"
        verbose_name_plural = "Testimonials"

    def __str__(self):
        return f"Testimonial from {self.name}"


class SocialMediaLink(models.Model):
    """Social media links"""
    PLATFORM_CHOICES = [
        ('LinkedIn', 'LinkedIn'),
        ('GitHub', 'GitHub'),
        ('Twitter', 'Twitter/X'),
        ('Dribbble', 'Dribbble'),
        ('Facebook', 'Facebook'),
        ('Instagram', 'Instagram'),
        ('YouTube', 'YouTube'),
        ('Other', 'Other'),
    ]
    
    platform = models.CharField(max_length=50, choices=PLATFORM_CHOICES)
    url = models.URLField()
    icon_class = models.CharField(
        max_length=100,
        help_text="CSS icon class (e.g., 'icon-LinkedIn')"
    )
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0, help_text="Display order (lower appears first)")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'platform']
        verbose_name = "Social Media Link"
        verbose_name_plural = "Social Media Links"

    def __str__(self):
        return self.platform
