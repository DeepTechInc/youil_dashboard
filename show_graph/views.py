from asyncio.windows_events import NULL
from typing import cast
from xml.etree.ElementTree import tostring
from django.shortcuts import render
from django.http.response import HttpResponse
import json
from .models import *
from django.db.models import IntegerField
from django.db.models.functions import Cast
from .forms import *
from datetime import datetime, timedelta
from itertools import chain

# plotly
import plotly.graph_objects as go
from plotly.subplots import make_subplots
from plotly.offline import plot
import plotly.figure_factory as ff
import numpy as np


# Create your views here.

def dash_main(request):
    context = getSPCGraph(request)

    return render(request, 'dashboard_main.html', context)

def getSpcChart(request):
    context = getSPCGraph(request)
    return render(request, 'dashboard_main.html', context)    

def getChartData(request):
    # globals for time chart
    time_arr = []
    time_label = []
    time_ucl_arr = []
    time_lcl_arr = []
    # globals for daily chart
    daily_arr = []
    daily_label = []
    daily_label_mnth = []
    daily_ucl_arr = []
    daily_lcl_arr = []
    # default division code : 10 물 사용량
    divisionCode = "10"

    # get parameter from request
    if request.method == "GET":
        s_param = request.GET

        if 'tabmenu' in s_param:
            divisionCode = s_param['tabmenu']
            print("\ndivisionCode", divisionCode)

    currentDay = str(datetime.now().day)
    currentMonth = datetime.now().month
    currentYear = str(datetime.now().year)

    if currentMonth < 10 :
        currentMonth = "0" + str(currentMonth)
    else:
        str(currentMonth)

    # select data per hour : today
    time_datas = Spc22Timetrendtable.objects.filter(
              division_code = divisionCode
            , simple_yearmonth = currentYear+currentMonth
            , simple_date = currentDay).values().order_by('simple_time')

    if len(time_datas) > 0:
        for data in time_datas:
            time_label.append(data['simple_time'])
            time_arr.append(data['value'])
    else :
        time_label = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
        time_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    
    #before_30_day = datetime.now() - timedelta(days=30) 
    #30일 전 계산하지 않고 order by 최신 날짜 기준 30개 limit 하였음

    # select data per day : 30 recent days
    daily_datas = Spc22Dailytrendtable.objects.filter(division_code=divisionCode).annotate(
                      intYearmonth = Cast('simple_yearmonth', output_field=IntegerField())
                    , intDate = Cast('simple_date', output_field=IntegerField())
            ).values().order_by('-intYearmonth', '-intDate')[:30]

    if len(daily_datas) > 0:
        daily_label_mnth.append(daily_datas[0]['simple_yearmonth'][-2:])

        for data in daily_datas:
            daily_label.append(int(data['simple_date']))
            daily_arr.append(data['value'])

            data_yearmonth = data['simple_yearmonth'][-2:]
            if daily_label_mnth[len(daily_label_mnth)-1] != data_yearmonth:
                daily_label_mnth.append(data_yearmonth)            
    
    daily_label.reverse()
    daily_label_mnth.reverse()  # 중복 제거
    daily_arr.reverse()

    # print("daily_label_mnth", daily_label_mnth)


    # select standard lcl of division code
    if divisionCode == "10":
        lcl_data = Spc22Datastandardtable.objects.filter(division_code=divisionCode, color_code='R1').values('ucl')
        # print(lcl_data[0]['ucl'])
        for i in range(0, len(time_label)):
            time_lcl_arr.append(lcl_data[0]['ucl'])

    # select standard ucl of division code
    if divisionCode == "10" or divisionCode == "20":
        ucl_data = Spc22Datastandardtable.objects.filter(division_code=divisionCode, color_code='R2').values('lcl')
        # print(ucl_data[0]['lcl'])
        for i in range(0, len(time_label)):
            time_ucl_arr.append(ucl_data[0]['lcl'])
    
    temp_context = {}
    if divisionCode == "50":
        print("SPC GRAPH DRAWING START At HERE")
        if s_param['spcId'] == '1':
            print("_ 51")
            return dash_main(request)
        elif s_param['spcId'] == '2':
            print("_ 52")
            return dash_main(request)

    context = {
        # data set from time chart
          'time_arr': time_arr 
        , 'time_label': time_label
        , 'time_ucl_arr': time_ucl_arr
        , 'time_lcl_arr' : time_lcl_arr
        
        # data set from daily chart
        , 'daily_arr': daily_arr
        , 'daily_label': daily_label
        , 'daily_label_mnth' : daily_label_mnth
        , 'daily_ucl_arr': daily_ucl_arr
        , 'daily_lcl_arr' : daily_lcl_arr
        , 'division_code': divisionCode 

        # plotly graph        
    }
    context.update(temp_context)

    # print(context.values())

    if request.method == "GET":
        s_param = request.GET
        if 'mode' in s_param and s_param['mode'] == "ajax":
            print("MODE : JSON / AJAX")
            return HttpResponse(json.dumps(context))
        else:
            return context
    
    

def getRealTimeData(request):
    w_usage_data = Spc22Realtimedatatable.objects.filter(division_code=10).values()
    w_quailty_data = Spc22Realtimedatatable.objects.filter(division_code=20).values()
    # equipment 1: cylinder, 2: 
    equp_stat1 = Spc22Realtimedatatable.objects.filter(division_code=40).values()
    equp_stat2 = ""

    # print(w_usage_data, w_quailty_data, equp_stat1)
    context = {
          'w_usage_data': w_usage_data[0]['value']
        , 'w_quailty_data': w_quailty_data[0]['value']
        , 'equp_stat1' : equp_stat1[0]['value']
    }

    # print("getRealTimeData", context)

    if request.method == "GET":
        s_param = request.GET
        if 'mode' in s_param and s_param['mode'] == "ajax":
            return HttpResponse(json.dumps(context))
        else:
            return context
        
def dict_to_list(target_dict):
    result_list = []
    
    for data in target_dict:
        temp = []
        temp.append(data['x1'])
        temp.append(data['x2'])
        temp.append(data['x3'])
        temp.append(data['x4'])
        temp.append(data['x5'])
        
        result_list.append(temp)
    
    return result_list, list(chain.from_iterable(result_list))

def list_chunk(lst, n):
    return [lst[i:i+n] for i in range(0, len(lst), n)]

def draw_graph(target_gildstandard='5'):
    gildstandard = target_gildstandard
    x_data = Spc22Inspectioninputtable.objects.filter(gildstandard = gildstandard).values('x1', 'x2', 'x3', 'x4', 'x5')
    scale = int(gildstandard)
    day = scale # / 4
    # print("!! : ", scale, day)
    
    # # 한 제품에 대해 하루 10개, 30일, 300개
    # np.random.seed(seed)
    if gildstandard == '5':
        x_bar_ucl = 6.0
        x_bar_lcl = 5
        x_r_ucl = 1.75
        x_r_lcl = 0.55
    elif gildstandard == '8':
        x_bar_ucl = 9.0
        x_bar_lcl = 8
        x_r_ucl = 1.50
        x_r_lcl = 2.00
    
    sample_data, flatten_sample_data = dict_to_list(x_data)
    sample_data = sample_data[(-1*scale):]
    flatten_sample_data = flatten_sample_data[(-1*5*scale):]
    

    x_sigma = []
    x_bar = []
    x_grand_bar = []
    x_bar_violation = []
    x_R = []
    x_R_violation = []   

    for i, data in enumerate(sample_data):
        x_sigma.append(sum(data))

    for i, data in enumerate(x_sigma):
        x_bar.append(data/5)

    for i, x_bar_data in enumerate(x_bar):
        x_grand_bar.append(sum(x_bar[:i+1]) / (i+1))

    for i, data in enumerate(sample_data):    
        x_R.append((max(data) - min(data)))


    trace_x_data = go.Scatter(
        x=[i for i in range(1, day+1)],
        y = sample_data,
        marker_color='#4682B4',
        name = 'DATA'
    )

    trace_frequency = go.Histogram(
        y = sample_data,
        marker_color='#4169E1',
        name = 'FREQUENCY'
    )

    trace_x_bar = go.Scatter(
        x=[i for i in range(1, day+1)],
        y=x_bar,
        name = 'X_BAR',
        hovertemplate='X_BAR: ' # 여기에 마우스 올렸을때 뜰 포맷 추가하면 됨@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 3/3 여기부터 볼 것
    )
    trace_x_bar_ucl = go.Scatter(
        x=[i for i in range(1, day+1)],
        y = [x_bar_ucl] * (day+1),
        mode='lines',
        name = 'X_BAR_UCL',
        line=dict(dash='dot',width=1),
    )
    trace_x_bar_lcl = go.Scatter(
        x=[i for i in range(1, day+1)],
        y = [x_bar_lcl] * (day + 1),
        mode='lines',
        name = 'X_BAR_LCL',
        line=dict(dash='dot',width=1),
    )
    trace_x_grand_bar = go.Scatter(
        x=[i for i in range(1, day+1)],
        y=x_grand_bar,
        name = 'X_GRAND_BAR'    
    )


    trace_x_R = go.Scatter(
        x=[i for i in range(1, day+1)],
        y=x_R,
        name = 'R'
    )
    trace_x_R_ucl = go.Scatter(
        x=[i for i in range(1, day+1)],
        y = [x_r_ucl] * (day + 1),
        name = 'R_UCL',
        mode='lines',
        line=dict(dash='dot',width=1), 
    )
    trace_x_R_lcl = go.Scatter(
        x=[i for i in range(1, day+1)],
        y = [x_r_lcl] * (day + 1),
        name = 'R_LCL',
        mode='lines',
        line=dict(dash='dot',width=1,color='blue'),     
    )
    
    x = np.random.normal(5, 0.5, day * 5)
    group_label = ['N(5,0.5)', 'SPC SAMPLE : 5㎛']
    
    if gildstandard == '8':
        x = np.random.normal(8, 0.5, day * 5)
        group_label = ['N(8,0.5)', 'SPC SAMPLE : 8㎛']
    
    hist_data = [x, flatten_sample_data]
    trace_distplot_base = ff.create_distplot(hist_data, group_label)
    
    # # trace_distplot_base.show()

    trace_displot_1_1 = go.Histogram(trace_distplot_base['data'][0],
                                marker_color='#0275d8',
                                )
    trace_displot_1_2 = go.Histogram(trace_distplot_base['data'][1],
                                marker_color='#ffa500',
                                )
    # print(trace_distplot_base['data'][0])                            
    trace_displot_2_1 = go.Scatter(trace_distplot_base['data'][2],
                                line=dict(color='#0275d8', width=1),
                                # showlegend=True,
                                )
    trace_displot_2_2 = go.Scatter(trace_distplot_base['data'][3],
                                line=dict(color='#ffa500', width=2),
                                # showlegend=True,
                                )
    
    # trace_distplot_base.show()

    fig = make_subplots(rows=2, cols=2,
                        # specs=[[{},{"secondary_y":True}]],
                        # specs=[[{}, {}],
                        #        [{"colspan":2}, {}],
                        #        [{"colspan":2}, {}]],
                        specs=[[{}, {"rowspan":2}],
                               [{}, {}]],                    
                        column_widths=[0.7, 0.3],
                        row_heights=[0.33, 0.33],
                        # shared_xaxes=True,
                        # subplot_titles=("DATA_SET", "CPK", "X_BAR", "", "R"),
                        subplot_titles=("X_BAR", "", "R"),
                        horizontal_spacing=0.05,
                        vertical_spacing=0.08,
                        )
    # # fig.add_trace(trace_x_data, 1, 1)
    # # fig.add_trace(trace_frequency, 1, 2)

    fig.append_trace(trace_x_bar, 1, 1)
    fig.append_trace(trace_x_grand_bar, 1, 1)
    fig.append_trace(trace_x_bar_ucl, 1, 1)
    fig.append_trace(trace_x_bar_lcl, 1, 1)


    fig.append_trace(trace_x_R, 2, 1)
    fig.append_trace(trace_x_R_ucl, 2, 1)
    fig.append_trace(trace_x_R_lcl, 2, 1)

    # fig.append_trace(trace_displot_1_1, 1, 2)
    # fig.append_trace(trace_displot_1_2, 1, 2)
    fig.append_trace(trace_displot_2_1, 1, 2)
    fig.append_trace(trace_displot_2_2, 1, 2)

    fig['layout'].update(height=700, width=1270, title='SPC SAMPLE : '+ gildstandard +'㎛')
    
    return fig    

def getSPCGraph(request):

    select_gild_type_form = SelectGoods()
    plot_div = 0
    plot_div_5 = 1
    plot_div_8 = 2
    
    # print(selected_name, "?")
    
    if request.method == 'POST':
        print('POST RECEIVED')
    elif request.method == 'GET':
        print('GET RECEIVED')
        # selected_name = request.GET.get('select_gildStandard')
        random_seed = 0

        # if selected_name == '5':
        #     random_seed = 55
        # elif selected_name == '8':
        #     random_seed = 88 

        
        fig = draw_graph('5')
        plot_div_5 = plot(fig, output_type='div')
    
        
        fig = draw_graph('8')
        plot_div_8 = plot(fig, output_type='div')             
    
        fig = draw_graph()
        plot_div = plot(fig, output_type='div')
        

    context = {
        'plot_div_5':plot_div_5,
        'plot_div_8':plot_div_8
    }

    return context
    