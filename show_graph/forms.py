from django import forms
from django.forms import ModelForm
from .models import *

class SelectGoods(forms.Form):
    GILDS_TYPE_CHOICE = (
        ('5', '5㎛'),
        ('8', '8㎛'),        
    )
    select_gildStandard = forms.ChoiceField(choices=GILDS_TYPE_CHOICE)