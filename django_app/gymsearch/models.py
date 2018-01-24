from django.db import models
from django.contrib.auth.models import User

class Gym(models.Model):
    id = models.IntegerField
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=30)
    price_year = models.FloatField(default=0)
    price_month = models.FloatField(default=0)
    price_3months = models.FloatField(default=0)
    price_6months = models.FloatField(default=0)
    offers = models.CharField(max_length=200)
    facilities = models.CharField(max_length=300)
    spa = models.NullBooleanField(null=True, blank=True, default=None)
    trx = models.NullBooleanField(null=True, blank=True, default=None)
    crossfit = models.NullBooleanField(null=True, blank=True, default=None)
    yoga = models.NullBooleanField(null=True, blank=True, default=None)
    pilates = models.NullBooleanField(null=True, blank=True, default=None)
    zumba = models.NullBooleanField(null=True, blank=True, default=None)
    women_only = models.NullBooleanField(null=True, blank=True, default=None)
    pool = models.NullBooleanField(null=True, blank=True, default=None)
    sauna = models.NullBooleanField(null=True, blank=True, default=None)
    parking = models.NullBooleanField(null=True, blank=True, default=None)

    def __str__(self):
        return "%s" % (self.name)

class Comment(models.Model):
    id = models.IntegerField
    content = models.CharField(max_length=500)
    gym = models.ForeignKey(Gym, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE, blank=True)
    username = models.CharField(max_length=50, default=" ")

    def __str__(self):
        return "%s %s %s" % (self.gym, self.user, self.content)



