from django.conf.urls import url
from . import views
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import verify_jwt_token

app_name = 'gymsearch'

urlpatterns = [
    url(r'^gyms/?$', views.GymList.as_view()),
    url(r'^gyms/(?P<pk>[0-9]+)/?$', views.GymDetail.as_view()),
    # url(r'^addcomment/?$', views.AddComment.as_view()),
    url(r'^comments/(?P<gym_id>[0-9]+)/?$', views.GymComments.as_view()),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api-token-verify/', verify_jwt_token),
    url(r'^users/$', views.UserList.as_view()),

    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),

]
