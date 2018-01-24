# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-12-28 10:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gymsearch', '0006_auto_20171108_1748'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='username',
            field=models.CharField(default=' ', max_length=50),
        ),
        migrations.AlterField(
            model_name='gym',
            name='crossfit',
            field=models.NullBooleanField(default=None),
        ),
        migrations.AlterField(
            model_name='gym',
            name='parking',
            field=models.NullBooleanField(default=None),
        ),
        migrations.AlterField(
            model_name='gym',
            name='pilates',
            field=models.NullBooleanField(default=None),
        ),
        migrations.AlterField(
            model_name='gym',
            name='pool',
            field=models.NullBooleanField(default=None),
        ),
        migrations.AlterField(
            model_name='gym',
            name='sauna',
            field=models.NullBooleanField(default=None),
        ),
        migrations.AlterField(
            model_name='gym',
            name='spa',
            field=models.NullBooleanField(default=None),
        ),
        migrations.AlterField(
            model_name='gym',
            name='trx',
            field=models.NullBooleanField(default=None),
        ),
        migrations.AlterField(
            model_name='gym',
            name='women_only',
            field=models.NullBooleanField(default=None),
        ),
        migrations.AlterField(
            model_name='gym',
            name='yoga',
            field=models.NullBooleanField(default=None),
        ),
        migrations.AlterField(
            model_name='gym',
            name='zumba',
            field=models.NullBooleanField(default=None),
        ),
    ]
