from gymsearch.models import Gym, Comment
from gymsearch.serializers import GymSerializer, CommentSerializer, UserSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User
from gymsearch.permissions import IsOwnerOrReadOnly, IsAdminOrReadOnly
from rest_framework import permissions

from django.contrib.staticfiles import views

class GymList(generics.ListCreateAPIView):

    serializer_class = GymSerializer

    permission_classes = (IsAuthenticatedOrReadOnly, IsAdminOrReadOnly)

    def get_queryset(self):
        queryset = Gym.objects.all()

        name = self.request.query_params.get('name', None)
        if name is not None:
            queryset = queryset.filter(name__icontains=name)

        city = self.request.query_params.get('city', None)
        if city is not None:
            queryset = queryset.filter(city__icontains=city)

        spa = self.request.query_params.get('spa', None)
        if spa is not None:
            queryset = queryset.filter(spa=spa)

        trx = self.request.query_params.get('trx', None)
        if trx is not None:
            queryset = queryset.filter(trx=trx)

        crossfit = self.request.query_params.get('crossfit', None)
        if crossfit is not None:
            queryset = queryset.filter(crossfit=crossfit)

        yoga = self.request.query_params.get('yoga', None)
        if yoga is not None:
            queryset = queryset.filter(yoga=yoga)

        pilates = self.request.query_params.get('pilates', None)
        if pilates is not None:
            queryset = queryset.filter(pilates=pilates)

        zumba = self.request.query_params.get('zumba', None)
        if zumba is not None:
            queryset = queryset.filter(zumba=zumba)

        women_only = self.request.query_params.get('women_only', None)
        if women_only is not None:
            queryset = queryset.filter(women_only=women_only)

        pool = self.request.query_params.get('pool', None)
        if pool is not None:
            queryset = queryset.filter(pool=pool)

        sauna = self.request.query_params.get('sauna', None)
        if sauna is not None:
            queryset = queryset.filter(sauna=sauna)

        parking = self.request.query_params.get('parking', None)
        if parking is not None:
            queryset = queryset.filter(parking=parking)
        return queryset

class GymDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Gym.objects.all()
    serializer_class = GymSerializer

class GymComments(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)

    serializer_class = CommentSerializer
    # lookup_field = 'gym'

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


    def get_queryset(self):
        queryset = Comment.objects.all()
        gym_id = self.kwargs.get('gym_id', None)
        if gym_id is not None:
            queryset = queryset.filter(gym=gym_id)
        return queryset


# class AddComment(generics.CreateAPIView):
#     permission_classes = (IsAuthenticatedOrReadOnly,)
#     serializer_class = CommentSerializer
#
#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)


class UserList(generics.ListCreateAPIView):
    permission_classes = ()
    queryset = User.objects.all()
    serializer_class = UserSerializer



class UserDetail(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = User.objects.all()
    serializer_class = UserSerializer