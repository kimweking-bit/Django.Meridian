from django.db import models

# Create your models here.
class Contact(models.Model):
    fullname=models.CharField(max_length=50)
    email=models.EmailField()
    subject=models.CharField(max_length=100)
    message=models.TextField()
    created_at=models.DateTimeField( null=True, blank=True, auto_now=True)

    def __str__(self):
        return self.fullname
