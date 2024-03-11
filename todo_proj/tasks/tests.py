from django.test import TestCase
from .models import Task
from django.contrib.auth.models import User


class TaskModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        author = User.objects.create(username="vova", password="lalala123123")
        Task.objects.create(title='bozhe ta cod normalno vzhe', body='structura v obsidiani', author=author)

    def test_title_content(self):
        task = Task.objects.get(id=1)
        expected_title_value = f'{task.title}'
        self.assertEqual(expected_title_value, 'bozhe ta cod normalno vzhe')

    def test_body_content(self):
        task = Task.objects.get(id=1)
        expected_body_value = f'{task.body}'
        self.assertEqual(expected_body_value, 'structura v obsidiani')

    def test_author_is(self):
        task = Task.objects.get(id=1)
        expected_author_value = f'{task.author.username}'
        self.assertEqual(expected_author_value, 'vova')
        
