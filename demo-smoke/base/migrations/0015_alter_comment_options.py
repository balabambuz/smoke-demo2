# Generated by Django 4.0.4 on 2023-07-25 13:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0014_alter_comment_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ('-_id',)},
        ),
    ]
