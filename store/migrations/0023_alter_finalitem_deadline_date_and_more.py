# Generated by Django 4.1.4 on 2023-03-10 05:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0022_finalitem_image_data_alter_finalitem_deadline_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='finalitem',
            name='deadline_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='finalitem',
            name='remaining_days',
            field=models.IntegerField(default=30),
        ),
    ]