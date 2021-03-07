from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import RecordTypeViewSet, RecordViewSet, index

router = DefaultRouter()
router.register(r"record", RecordViewSet)
router.register(r"record_type", RecordTypeViewSet)

urlpatterns = [path("", index, name="index"), path("api/", include(router.urls))]
