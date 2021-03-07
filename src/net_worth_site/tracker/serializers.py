from rest_framework.serializers import ModelSerializer

from .models import Record, RecordType


class RecordSerializer(ModelSerializer):
    class Meta:
        model = Record
        fields = ["id", "record_type", "name", "balance"]


class RecordTypeSerializer(ModelSerializer):
    class Meta:
        model = RecordType
        fields = ["id", "name"]
