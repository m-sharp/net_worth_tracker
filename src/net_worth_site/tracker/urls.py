from django.urls import path

from .views import create, get_all, get_record_types, index, records

urlpatterns = [
    path("", index, name="index"),
    path("record-types", get_record_types, name="get all record types"),
    path("records/get-all", get_all, name="get all records"),
    path("records/create", create, name="POST new record"),
    path("records/<int:record_id>/", records, name="GET/DELETE records"),
]
