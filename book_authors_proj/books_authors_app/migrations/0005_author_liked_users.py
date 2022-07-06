# Generated by Django 4.0.5 on 2022-07-02 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books_authors_app', '0004_book_liked_users'),
    ]

    operations = [
        migrations.AddField(
            model_name='author',
            name='liked_users',
            field=models.ManyToManyField(related_name='user_liked', to='books_authors_app.users'),
        ),
    ]
