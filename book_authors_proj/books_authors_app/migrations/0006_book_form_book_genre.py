# Generated by Django 4.0.5 on 2022-07-02 17:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books_authors_app', '0005_author_liked_users'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='form',
            field=models.CharField(max_length=140, null=True),
        ),
        migrations.AddField(
            model_name='book',
            name='genre',
            field=models.TextField(null=True),
        ),
    ]