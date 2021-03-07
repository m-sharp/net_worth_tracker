from django.db import models


# ToDo: Need to seed records for 'Asset' and 'Liability'
class RecordType(models.Model):
    name = models.CharField(max_length=25)

    def __str__(self):
        return self.name


class Records(models.Model):
    record_type = models.ForeignKey(RecordType, on_delete=models.PROTECT)
    name = models.CharField(max_length=100)
    balance = models.FloatField(default=0)

    def __str__(self):
        return self.name
