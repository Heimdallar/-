import {
    EnvironmentOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import { LayerLine } from '@poizon-design/icons';
import './index.less';
import { Timeline } from 'poizon-design';
import Show from '../page-show';
import { ProCard } from "@poizon-design/pro-card";
import { Tag } from 'poizon-design';
import  styles  from './index.less'
import React, { useState, useEffect} from 'react';
import { Typography } from 'poizon-design';
// import { proRequest } from '@/utils/request';
import { fetchData } from '../service';

interface Activity {
    state: number;
    activityName: string;
    activityDesc: string;
    startTime: string;
    endTime: string;
    categories: string;
    holdAddress: string
}

export default function Pageshow() {
    const [ activities, setActivities ] = useState<Activity[]>([]);
    const { Paragraph } = Typography;
    const [ ellipsis ] = React.useState(true);
    
    // useEffect((params={})=>{
    //     fetchData(params)
    // })

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetchData({});
                    if (response.code === 0 && response.data && response.data.code === 200) {
                        setActivities(response.data.data);
                    } else {
                        console.error('Error', response);
                    }
            } catch (error) {
                console.error('Error', error)
            }
        };

        fetchActivities().catch((error) => {
            console.error('Error',error);
        });
    },[]);
    

    return (
        <div style = {{margin:20}}>
            <Timeline>
                {activities.map((activity, index)=> {
                    switch (activity.state) {
                        case 2: //Future
                            return (
                                <div className='Future' key={index}>
                                    <Timeline.Item color='grey' className={styles.PreTI}>
                                        <h1>{activity.startTime}</h1>
                                    </Timeline.Item>
                                    <div className='FutureCard'> 
                                        <ProCard split='vertical'>
                                            <ProCard colSpan="85%">
                                                <h3>{activity.activityName}  <Tag color="warning">进行中</Tag></h3>
                                                <Paragraph ellipsis={ellipsis ? { rows: 1, expandable: true, symbol: 'more' } : false}>{activity.activityDesc}</Paragraph>
                                                <div className="icons-list"><LayerLine />招商类目：{activity.categories}</div>
                                                <div className="icons-list"><CalendarOutlined rev={undefined}/>举办时间：{activity.startTime}-{activity.endTime}</div>
                                                <div className="icons-list"><EnvironmentOutlined rev={undefined}/>举办地址：{activity.holdAddress}</div>
                                            </ProCard>
                                            <div className='button'>
                                                <Show></Show>
                                            </div>
                                        </ProCard>  
                                        <p></p>
                                    </div>
                                </div>
                            );
                        case 1: //Present
                            return (
                                <div className='Present' key={index}>
                                    <Timeline.Item color='grey' className={styles.PreTI}>
                                        <h1>{activity.startTime}</h1>
                                    </Timeline.Item>
                                    <div className='PresentCard'> 
                                        <ProCard split='vertical'>
                                            <ProCard colSpan="85%">
                                                <h3>{activity.activityName}  <Tag color="processing">进行中</Tag></h3>
                                                <Paragraph ellipsis={ellipsis ? { rows: 1, expandable: true, symbol: 'more' } : false}>{activity.activityDesc}</Paragraph>
                                                <div className="icons-list"><LayerLine />招商类目：{activity.categories}</div>
                                                <div className="icons-list"><CalendarOutlined rev={undefined}/>举办时间：{activity.startTime}-{activity.endTime}</div>
                                                <div className="icons-list"><EnvironmentOutlined rev={undefined}/>举办地址：{activity.holdAddress}</div>
                                            </ProCard>
                                            <div className='button'>
                                                <Show></Show>
                                            </div>
                                        </ProCard>  
                                        <p></p>
                                    </div>
                                </div>
                            );
                        case 0: //Past
                            return (
                                <div className='Past' key={index}>
                                    <Timeline.Item color='grey' className={styles.PastTI} >
                                        <h1>{activity.startTime}</h1>
                                    </Timeline.Item>
                                    <div className='PastCard'> 
                                        <ProCard>
                                            <h3>{activity.activityName}  <Tag color="default">已结束</Tag></h3>
                                            <Paragraph ellipsis={ellipsis ? { rows: 1, expandable: true, symbol: 'more' } : false}>{activity.activityDesc}</Paragraph>
                                            <div className="icons-list"><LayerLine />招商类目：{activity.categories}</div>
                                            <div className="icons-list"><CalendarOutlined rev={undefined}/>举办时间：{activity.startTime}-{activity.endTime}</div>
                                            <div className="icons-list"><EnvironmentOutlined rev={undefined}/>举办地址：{activity.holdAddress}</div>
                                        </ProCard>  
                                        <p></p>
                                    </div>
                                </div>
                            )
                        default:
                            return null
                    }
                })}
            </Timeline>
        </div>
    )
}