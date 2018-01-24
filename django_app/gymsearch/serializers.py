from rest_framework import serializers
from .models import Gym, Comment
from django.contrib.auth.models import User

class GymSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gym
        fields = ('id', 'name', 'address', 'city', 'price_year', 'price_month',
                  'price_3months', 'price_6months', 'offers', 'facilities', 'spa',
                  'trx', 'crossfit', 'yoga', 'pilates', 'zumba', 'women_only',
                  'pool', 'sauna', 'parking')

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Comment


        fields = ('id', 'content', 'gym', 'timestamp', 'user', 'username')

class UserSerializer(serializers.ModelSerializer):
    # comments = serializers.PrimaryKeyRelatedField(many=True, queryset=Comment.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'password','email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
