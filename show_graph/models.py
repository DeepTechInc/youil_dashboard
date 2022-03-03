from django.db import models

# Create your models here.

class Spc22Dailytrendtable(models.Model):
    simple_yearmonth = models.CharField(primary_key=True, max_length=6)
    simple_date = models.CharField(max_length=2)
    division_code = models.IntegerField()
    value = models.FloatField()
    accumulated_value = models.FloatField(blank=True, null=True)
    etl_user = models.CharField(max_length=25, blank=True, null=True)
    etl_datetime = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'spc22_dailytrendtable'
        unique_together = (('simple_yearmonth', 'simple_date', 'division_code', 'value'),)


class Spc22Datastandardtable(models.Model):
    division_code = models.IntegerField(primary_key=True)
    color_code = models.CharField(max_length=2)
    ucl = models.FloatField(blank=True, null=True)
    lcl = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'spc22_datastandardtable'
        unique_together = (('division_code', 'color_code'),)

class Spc22Realtimedatatable(models.Model):
    division_code = models.CharField(primary_key=True, max_length=2)
    value = models.FloatField()
    accumulated_value = models.FloatField(blank=True, null=True)
    etl_user = models.CharField(max_length=25, blank=True, null=True)
    etl_datetime = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'spc22_realtimedatatable'


class Spc22Timetrendtable(models.Model):
    simple_yearmonth = models.CharField(primary_key=True, max_length=6)
    simple_date = models.CharField(max_length=2)
    simple_time = models.CharField(max_length=2)
    division_code = models.IntegerField()
    value = models.FloatField()
    accumulated_value = models.FloatField(blank=True, null=True)
    etl_user = models.CharField(max_length=25, blank=True, null=True)
    etl_datetime = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'spc22_timetrendtable'
        unique_together = (('simple_yearmonth', 'simple_date', 'simple_time', 'division_code', 'value'),)

from django.db import models

# Create your models here.

class Spc22Dailytrendtable(models.Model):
    simple_yearmonth = models.CharField(primary_key=True, max_length=6)
    simple_date = models.CharField(max_length=2)
    division_code = models.IntegerField()
    value = models.FloatField()
    accumulated_value = models.FloatField(blank=True, null=True)
    etl_user = models.CharField(max_length=25, blank=True, null=True)
    etl_datetime = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'spc22_dailytrendtable'
        unique_together = (('simple_yearmonth', 'simple_date', 'division_code', 'value'),)


class Spc22Datastandardtable(models.Model):
    division_code = models.IntegerField(primary_key=True)
    color_code = models.CharField(max_length=2)
    ucl = models.FloatField(blank=True, null=True)
    lcl = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'spc22_datastandardtable'
        unique_together = (('division_code', 'color_code'),)

class Spc22Realtimedatatable(models.Model):
    division_code = models.CharField(primary_key=True, max_length=2)
    value = models.FloatField()
    accumulated_value = models.FloatField(blank=True, null=True)
    etl_user = models.CharField(max_length=25, blank=True, null=True)
    etl_datetime = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'spc22_realtimedatatable'


class Spc22Timetrendtable(models.Model):
    simple_yearmonth = models.CharField(primary_key=True, max_length=6)
    simple_date = models.CharField(max_length=2)
    simple_time = models.CharField(max_length=2)
    division_code = models.IntegerField()
    value = models.FloatField()
    accumulated_value = models.FloatField(blank=True, null=True)
    etl_user = models.CharField(max_length=25, blank=True, null=True)
    etl_datetime = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'spc22_timetrendtable'
        unique_together = (('simple_yearmonth', 'simple_date', 'simple_time', 'division_code', 'value'),)

class MesGoodsnumtable(models.Model):
    goodsnum_index = models.IntegerField(primary_key=True)
    goodsnum_code = models.CharField(unique=True, max_length=50)
    goodsnum_name = models.CharField(max_length=50)
    goodsnumgroup_index = models.IntegerField(blank=True, null=True)
    customer_index = models.IntegerField()
    goodsnum_customer = models.CharField(max_length=50, blank=True, null=True)
    goodstype_index = models.IntegerField(blank=True, null=True)
    gildtype = models.CharField(db_column='gildType', max_length=50)  # Field name made lowercase.
    standard = models.CharField(max_length=250, blank=True, null=True)
    unit = models.CharField(max_length=20)
    output_unit = models.CharField(max_length=20)
    goodsnum_unit_name = models.CharField(max_length=50, blank=True, null=True)
    result_table = models.IntegerField()
    youilnumber = models.CharField(db_column='youilNumber', max_length=50, blank=True, null=True)  # Field name made lowercase.
    gildstandard = models.CharField(db_column='gildStandard', max_length=50, blank=True, null=True)  # Field name made lowercase.
    goodsclassify_index1 = models.CharField(max_length=50)
    goodsclassify_index2 = models.CharField(max_length=50)
    goodsclassify_index3 = models.CharField(max_length=50)
    accrue_in_amount = models.FloatField(blank=True, null=True)
    accrue_out_amount = models.FloatField(blank=True, null=True)
    indate = models.DateTimeField(blank=True, null=True)
    outdate = models.DateTimeField(blank=True, null=True)
    remark = models.CharField(max_length=200, blank=True, null=True)
    useyn = models.IntegerField()
    fileupload = models.CharField(max_length=100)
    historyindex = models.IntegerField()
    autobarrel = models.IntegerField(blank=True, null=True)
    line_index = models.IntegerField()
    safe_amount = models.FloatField(blank=True, null=True)
    alarmyn = models.IntegerField(blank=True, null=True)
    unit_name = models.CharField(max_length=50, blank=True, null=True)
    goodsnum_output_unit_name = models.CharField(max_length=50, blank=True, null=True)
    output_rate = models.FloatField(blank=True, null=True)
    rack_charging_cnt = models.IntegerField()
    rack_unit = models.CharField(max_length=50)
    power = models.IntegerField()
    power_unit = models.CharField(max_length=50)
    gildtime = models.IntegerField(db_column='gildTime')  # Field name made lowercase.
    gildtime_unit = models.CharField(max_length=50)
    rack_img = models.CharField(max_length=100, blank=True, null=True)
    material_width = models.CharField(max_length=100, blank=True, null=True)
    color = models.CharField(max_length=100, blank=True, null=True)
    stand_unitcost = models.BigIntegerField(blank=True, null=True)
    process = models.CharField(max_length=50, blank=True, null=True)
    subm_shape = models.CharField(max_length=150, blank=True, null=True)
    subm_case_size = models.CharField(max_length=150, blank=True, null=True)
    material_type = models.CharField(max_length=150, blank=True, null=True)
    works_type = models.CharField(max_length=150, blank=True, null=True)
    chemical_polishing = models.CharField(max_length=150, blank=True, null=True)
    sanding = models.CharField(max_length=150, blank=True, null=True)
    unit_weight = models.CharField(max_length=150, blank=True, null=True)
    apply_field = models.CharField(max_length=150, blank=True, null=True)
    car_type = models.CharField(max_length=150, blank=True, null=True)
    model_name = models.CharField(max_length=150, blank=True, null=True)
    carrier_amt = models.CharField(max_length=150, blank=True, null=True)
    shineyn = models.CharField(max_length=50, blank=True, null=True)
    gildthick_insidespec = models.CharField(max_length=50, blank=True, null=True)
    each_amount = models.CharField(max_length=50, blank=True, null=True)
    order_amount = models.CharField(max_length=50, blank=True, null=True)
    goodsnum_thick = models.CharField(max_length=50, blank=True, null=True)
    goodsnum_thick_unit = models.CharField(max_length=50, blank=True, null=True)
    goodsnum_width = models.CharField(max_length=50, blank=True, null=True)
    goodsnum_width_unit = models.CharField(max_length=50, blank=True, null=True)
    goodsnum_weight = models.CharField(max_length=50, blank=True, null=True)
    goodsnum_weight_unit = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mes_goodsnumtable'

class Spc22Inspectioninputtable(models.Model):
    inspectioninput_index = models.AutoField(primary_key=True)
    inspection_index = models.IntegerField()
    sample_type_code = models.IntegerField()
    input_datetime = models.CharField(max_length=50, blank=True, null=True)
    complete_datetime = models.CharField(max_length=50, blank=True, null=True)
    x1 = models.FloatField(blank=True, null=True)
    x2 = models.FloatField(blank=True, null=True)
    x3 = models.FloatField(blank=True, null=True)
    x4 = models.FloatField(blank=True, null=True)
    x5 = models.FloatField(blank=True, null=True)
    writer = models.CharField(max_length=50, blank=True, null=True)
    reg_datetime = models.DateTimeField()
    gildstandard = models.CharField(db_column='gildStandard', max_length=50, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'spc22_inspectioninputtable'        