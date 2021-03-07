from django.shortcuts import render

from .models import Record, RecordType


def index(request):
    asset = RecordType.objects.filter(name="Asset").first()
    liability = RecordType.objects.filter(name="Liability").first()

    assets = Record.objects.filter(record_type=asset)
    liabilities = Record.objects.filter(record_type=liability)

    asset_total = get_asset_total(assets)
    liability_total = get_liabilities_total(liabilities)

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


# ToDo: Should isolate models queries into another file probably
def get_asset_total(assets):
    return sum([asset.balance for asset in assets])


def get_liabilities_total(liabilities):
    return sum([liability.balance for liability in liabilities])


# ToDo: Add POST endpoint for Records
# ToDo: Add Get All endpoint
