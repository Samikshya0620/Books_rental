# Generated by Django 4.1.4 on 2023-02-24 05:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0015_alter_user_email_alter_user_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='middlename',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
