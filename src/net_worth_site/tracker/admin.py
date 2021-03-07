from django.contrib import admin

from .models import Record, RecordType

admin.site.register(Record)
admin.site.register(RecordType)
