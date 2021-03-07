from django.http import HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.views.decorators.csrf import csrf_exempt

from .models import (
    Record,
    asset_record_type,
    get_all_record_types,
    get_all_records,
    get_total_balance,
    liability_record_type,
)


def index(request):
    assets = asset_record_type.record_set.all()
    liabilities = liability_record_type.record_set.all()

    asset_total = get_total_balance(assets)
    liability_total = get_total_balance(liabilities)
    net_worth = round(asset_total - liability_total, 2)

    return render(
        request,
        "tracker/index.html",
        dict(
            assets=assets,
            liabilities=liabilities,
            asset_total=asset_total,
            liability_total=liability_total,
            net_worth=net_worth,
        ),
    )


def get_record_types(request):
    return JsonResponse(list(get_all_record_types()), safe=False)


def get_all(request):
    asset_total = get_total_balance(asset_record_type.record_set.all())
    liability_total = get_total_balance(liability_record_type.record_set.all())
    net_worth = round(asset_total - liability_total, 2)
    return JsonResponse(
        dict(
            meta=dict(asset_total=asset_total, liability_total=liability_total, net_worth=net_worth),
            data=list(get_all_records()),
        )
    )


@csrf_exempt  # ToDo: Probably not good :sweat-smile: Only effects POSTs
def create(request):
    if request.method != "POST":
        raise HttpResponseNotAllowed("Method not allowed")
    record = Record(**request.POST.dict())
    record.save()
    return JsonResponse(dict(record), status=201)


# ToDo: Add DELETE for records
def records(request, record_id):
    # ToDo: Need DjangoRestFramework for DELETE apparently...
    if request.method == "DELETE":
        # YourModelName.objects.filter(id=id).delete()
        return JsonResponse(dict(), status=201)
    elif request.method == "GET":
        if not record_id:
            return HttpResponseBadRequest("Record ID needed for GET request")
        record = get_object_or_404(Record, pk=record_id)
        return JsonResponse(dict(record))
    else:
        return HttpResponseNotAllowed("Method not allowed")
