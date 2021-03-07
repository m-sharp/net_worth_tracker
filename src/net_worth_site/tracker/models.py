from django.db.models import PROTECT, CharField, FloatField, ForeignKey, Model


class RecordType(Model):
    name = CharField(max_length=25)

    def __str__(self):
        return self.name

    def __iter__(self):
        yield "name", self.name
        if self.id:
            yield "id", self.id


asset_record_type = RecordType.objects.filter(name="Asset").first()
liability_record_type = RecordType.objects.filter(name="Liability").first()


def get_all_record_types():
    return RecordType.objects.all().values("id", "name")


class Record(Model):
    record_type = ForeignKey(RecordType, on_delete=PROTECT)
    name = CharField(max_length=100)
    balance = FloatField(default=0)

    def __str__(self):
        return self.name

    def __iter__(self):
        yield "record_type", self.record_type.name  # ToDo: ??
        yield "name", self.name
        yield "balance", self.balance
        if self.id:
            yield "id", self.id


def get_total_balance(records):
    return sum([record.balance for record in records])
