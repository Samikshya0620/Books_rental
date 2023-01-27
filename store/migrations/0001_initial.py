# Generated by Django 4.1.4 on 2022-12-24 17:31

from django.db import migrations, models
import django.db.models.deletion
import store.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.CharField(max_length=150)),
                ('name', models.CharField(max_length=150)),
                ('image', models.ImageField(upload_to=store.models.get_file_path)),
                ('description', models.TextField(max_length=500)),
                ('status', models.BooleanField(default=False, help_text='0=Default, 1=Hidden')),
                ('trending', models.BooleanField(default=False, help_text='0=Default, 1=Trending')),
                ('meta_title', models.CharField(max_length=100)),
                ('meta_keywords', models.CharField(max_length=100)),
                ('meta_description', models.CharField(max_length=500)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.CharField(max_length=150)),
                ('name', models.CharField(max_length=150)),
                ('product_image', models.ImageField(blank=True, null=True, upload_to=store.models.get_file_path)),
                ('small_description', models.CharField(max_length=250)),
                ('quantity', models.IntegerField()),
                ('description', models.TextField(max_length=250)),
                ('selling_price', models.FloatField()),
                ('status', models.BooleanField(default=False, help_text='0=Default, 1=Hidden')),
                ('trending', models.BooleanField(default=False, help_text='0=Default, 1=Trending')),
                ('meta_title', models.CharField(max_length=100)),
                ('meta_keywords', models.CharField(max_length=100)),
                ('meta_description', models.CharField(max_length=500)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.category')),
            ],
        ),
    ]
