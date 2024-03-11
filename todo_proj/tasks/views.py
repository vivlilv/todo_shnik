from rest_framework import generics

from .models import Task
from .serializers import TaskSerializer
from rest_framework.permissions import IsAdminUser


class TaskList(generics.ListCreateAPIView):
    
    serializer_class = TaskSerializer
    # permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Task.objects.all().filter(author=self.request.user)


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    #permission_classes = [IsAdminUser]
    
