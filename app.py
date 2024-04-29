from flask import Flask, render_template, request, send_file
import pandas as pd
import os

app = Flask(__name__, static_folder='../timetable-frontend/build', static_url_path='/')

def populate(s):
    length=len(s)
    list_1=[]
    class_ind=[]
    for k in range(length):
        if str(s.iat[k,0]).lower()!='nan' and str(s.iat[k,1]).lower()!='nan':
            class_ind.append(list((s.iat[k,0],s.iat[k,1])))
        else:
            list_1.append(class_ind)
            class_ind=[]
    list_1.append(class_ind)
    return list_1

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/view', methods=['POST'])
def view():
    files = [request.files[f'file{i}'] for i in range(1, 4)]
    s2=pd.read_excel(files[0])
    s1=pd.read_excel(files[1])
    s3=pd.read_excel(files[2])

    teachers=s1['faculty'].dropna().unique().tolist()
    teacher_course=populate(s1)
    teacher_len=len(teachers)

    t_len=len(s2)
    course_hour=populate(s3)
    timeslot=[[0]*120 for i in range(t_len)]
    teacherslot=[[0]*120 for i in range(teacher_len)]

    for i in range(t_len):
        index=0
        for j in range(35):
            timeslot[i][index]=str(s2.iat[i,j])
            if (j!=0 and j%7==0):
                index+=17
            else:
                index+=1

    for k in range(t_len):
        c_t=teacher_course[k]
        c_h=course_hour[k]
        for i in range(len(c_h)):
            course=c_h[i][0]
            hour=c_h[i][1]
            fac=str(s1.loc[s1["course"]==course,'faculty'].item())
            t_index=teachers.index(fac)
            alloc_hr=0
            rem_hr=hour
            slots=[]
            while rem_hr>0:
                for j in range(120):
                    if str(timeslot[k][j]).lower()=="nan":
                        begin=j
                        break
                for j in range(119,-1,-1):
                    if str(timeslot[k][j]).lower()=="nan":
                        end=j
                        break
                if rem_hr!=1:
                    interval=(end-begin+1)/(rem_hr-1)
                pos=begin
                for j in range(int(rem_hr)):
                    slots.append(pos)
                    pos=pos+interval
                for slot in slots:
                    if str(timeslot[k][int(slot)]).lower()=="nan" and teacherslot[t_index][int(slot)]==0:
                        timeslot[k][int(slot)]=course
                        teacherslot[t_index][int(slot)]=course
                    else:
                        left=int(slot)-1
                        right=int(slot)+1
                        while left>0 or right < 120:
                            if (left >= 0 and str(timeslot[k][left]).lower() == "nan") and teacherslot[t_index][int(slot)] == 0:
                                timeslot[k][left] = course
                                teacherslot[t_index][left] = course
                                break
                            if (right < 120 and str(timeslot[k][right]).lower() == "nan") and teacherslot[t_index][int(slot)] == 0:
                                timeslot[k][right] = course
                                teacherslot[t_index][right] = course
                                break
                            left = left - 1
                            right = right + 1
                        if left < 0 and right >= 120:
                            print("ERROR: ALLOCATION COULD NOT BE DONE")
                            quit()

                    rem_hr -= 1

    temp=[[0]*35 for i in range(t_len)]
    for i in range(t_len):
        index=0
        for j in range(35):
            temp[i][j]=timeslot[i][index]
            if j%7==0 and j!=0:
                index+=17
            else:    
                index+=1

    tf=pd.DataFrame(temp,index=['3rd','2nd'],columns=['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th','13th','14th','15th','16th','17th','18th','19th','20th','21th','22th','23rd','24th','25th','26th','27th','28th','29th','30th','31th','32th','33rd','34th','35th'])
    tf.to_excel("timetable-frontend/build/static/tf.xlsx")
    return send_file("timetable-frontend/build/static/tf.xlsx", as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
