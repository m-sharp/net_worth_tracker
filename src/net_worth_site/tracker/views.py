from django.http import HttpResponse
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from .models import Record, RecordType, asset_record_type, get_total_balance, liability_record_type
from .serializers import RecordSerializer, RecordTypeSerializer


class RecordViewSet(ModelViewSet):
    """
    Enables the following endpoints when registered via a router in :mod:`~net_worth_site.tracker.urls`:
        * GET /tracker/api/record/
        * GET /tracker/api/record/<ID>/
        * GET /tracker/api/record/get_all/
        * DELETE /tracker/api/record/<ID>/
        * POST /tracker/api/record/ (w/ x-www-form-urlencoded data)
    """

    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=["GET"])
    def get_all(self, request):
        """
        Custom endpoint that extends the general list output of /tracker/api/record/ with some meta data calculations,
        saving the front-end an additional request.

        Args:
            request (:class:`django.http.HttpRequest`): HttpRequest object containing information about the request
        Returns:
            :class:`django.http.HttpResponse`: HttpResponse object containing the list of data records and meta data
                calculations.
        """
        query_set = self.get_queryset()
        asset_total = get_total_balance(query_set.filter(record_type=asset_record_type))
        liability_total = get_total_balance(query_set.filter(record_type=liability_record_type))
        net_worth = round(asset_total - liability_total, 2)
        list_response = self.list(request)
        list_response.data = dict(
            meta=dict(
                asset_total=asset_total,
                liability_total=liability_total,
                net_worth=net_worth,
            ),
            data=list_response.data,
        )
        return list_response


class RecordTypeViewSet(ReadOnlyModelViewSet):
    """
    Enables the following endpoints when registered via a router in :mod:`~net_worth_site.tracker.urls`:
        * GET /tracker/api/record_type/
        * GET /tracker/api/record_type/<ID>/
    """

    queryset = RecordType.objects.all()
    serializer_class = RecordTypeSerializer
    permission_classes = [AllowAny]


def index(request):
    """
    Enables the GET /tracker/ endpoint when registered in mod:`~net_worth.site.tracker.urls`.
    """
    return HttpResponse("Bout time for some React here")
