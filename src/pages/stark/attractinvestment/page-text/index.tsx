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
import { fetchData } from '../service';
import Pageform from '../page-form';
import { requestApi } from '@/utils/request';

interface Activity {
    id:number;
    state: number;
    activityName: string;
    activityDesc: string;
    startTime: string;
    endTime: string;
    catogories: string;
    holdAddress: string
}

export default function Pageshow() {
    const [ activities, setActivities ] = useState<Activity[]>([]);
    const { Paragraph } = Typography;
    const [ ellipsis ] = React.useState(true);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        fetchData({})
            .then(setActivities)
            .catch(console.error)
            .finally(() => setLoading(false));
    },[])

    if (loading) {
        return <div>Loading...</div>
    }

//     return (
//         <div style = {{margin:20}}>
//             {activities.length > 0 ? (
//             <Timeline>
//                 {activities.map((activity, index)=> {
//                     switch (activity.state) {
//                         case 2: //Future
//                             return (
//                                 <div className='Future' key={index}>
//                                     <Timeline.Item className={styles.PreTI}>
//                                         <h1>{activity.startTime.substring(5,10)}</h1>
//                                     </Timeline.Item>
//                                     <div className='FutureCard'> 
//                                         <ProCard split='vertical'>
//                                             <ProCard colSpan="85%">
//                                                 <h3>{activity.activityName}  <Tag color="warning">未开始</Tag></h3>
//                                                 <Paragraph ellipsis={ellipsis ? { rows: 1, expandable: true, symbol: 'more' } : false}>{activity.activityDesc}</Paragraph>
//                                                 <div className="icons-list"><LayerLine />招商类目：{activity.catogories}</div>
//                                                 <div className="icons-list"><CalendarOutlined rev={undefined}/>举办时间：{activity.startTime}-{activity.endTime}</div>
//                                                 <div className="icons-list"><EnvironmentOutlined rev={undefined}/>举办地址：{activity.holdAddress}</div>
//                                             </ProCard>
//                                             <div className='button'>
//                                                 <Show></Show>
//                                             </div>
//                                         </ProCard>  
//                                         <p></p>
//                                     </div>
//                                 </div>
//                             );
//                         case 1: //Present
//                             return (
//                                 <div className='Present' key={index}>
//                                     <Timeline.Item color='grey' className={styles.PreTI}>
//                                         <h1>{activity.startTime.substring(5,10)}</h1>
//                                     </Timeline.Item>
//                                     <div className='PresentCard'> 
//                                         <ProCard split='vertical'>
//                                             <ProCard colSpan="85%">
//                                                 <h3>{activity.activityName}  <Tag color="processing">进行中</Tag></h3>
//                                                 <Paragraph ellipsis={ellipsis ? { rows: 1, expandable: true, symbol: 'more' } : false}>{activity.activityDesc}</Paragraph>
//                                                 <div className="icons-list"><LayerLine />招商类目：{activity.catogories}</div>
//                                                 <div className="icons-list"><CalendarOutlined rev={undefined}/>举办时间：{activity.startTime}-{activity.endTime}</div>
//                                                 <div className="icons-list"><EnvironmentOutlined rev={undefined}/>举办地址：{activity.holdAddress}</div>
//                                             </ProCard>
//                                             <div className='button'>
//                                                 <Show></Show>
//                                             </div>
//                                         </ProCard>  
//                                         <p></p>
//                                     </div>
//                                 </div>
//                             );
//                         case 0: //Past
//                             return (
//                                 <div className='Past' key={index}>
//                                     <Timeline.Item color='grey' className={styles.PastTI} >
//                                         <h1>{activity.startTime.substring(5,10)}</h1>
//                                     </Timeline.Item>
//                                     <div className='PastCard'> 
//                                         <ProCard>
//                                             <h3>{activity.activityName}  <Tag color="default">已结束</Tag></h3>
//                                             <Paragraph ellipsis={ellipsis ? { rows: 1, expandable: true, symbol: 'more' } : false}>{activity.activityDesc}</Paragraph>
//                                             <div className="icons-list"><LayerLine />招商类目：{activity.catogories}</div>
//                                             <div className="icons-list"><CalendarOutlined rev={undefined}/>举办时间：{activity.startTime}-{activity.endTime}</div>
//                                             <div className="icons-list"><EnvironmentOutlined rev={undefined}/>举办地址：{activity.holdAddress}</div>
//                                         </ProCard>  
//                                         <p></p>
//                                     </div>
//                                 </div>
//                             )
//                         default:
//                             return null
//                     }
//                 })}
//             </Timeline>
//         ) : (
//             <p>Loading...</p>     
//         )}
//         </div>
//     )
// }        

    const futureActivities = activities.filter(activity => activity.state === 0);
    const presentActivities = activities.filter(activity => activity.state === 1);
    const pastActivities = activities.filter(activity => activity.state === 2);

    return (
        <div style = {{ margin:20 }}>
            <Timeline>
                {futureActivities.map((activity, index) => {
                    return (
                    <div className='Future' key={index}>
                        <Timeline.Item className={styles.FutTI}>
                            <h1>{activity.startTime.substring(5,10)}</h1>
                        </Timeline.Item>
                        <div className='FutureCard'> 
                            <ProCard split='vertical'>
                                <ProCard colSpan="85%">
                                    <h3>{activity.activityName}  <Tag color="warning">未开始</Tag></h3>
                                    <Paragraph ellipsis={ellipsis ? { rows: 1, expandable: true, symbol: '展开' } : false}>{activity.activityDesc}</Paragraph>
                                    <div className="icons-list"><LayerLine /> 招商类目：{activity.catogories}</div>
                                    <div className="icons-list"><CalendarOutlined rev={undefined}/> 举办时间：{activity.startTime}-{activity.endTime}</div>
                                    <div className="icons-list"><EnvironmentOutlined rev={undefined}/> 举办地址：{activity.holdAddress}</div>
                                </ProCard>
                                <div className='button'>
                                    <Show></Show>
                                </div>
                            </ProCard>  
                                <p></p>
                        </div>
                    </div>
                    )
                })}
                {presentActivities.map((activity, index) => {
                    return (
                    <div className='Present' key={index}>
                        <Timeline.Item color='grey' className={styles.PreTI}>
                            <h1>{activity.startTime.substring(5,10)}</h1>
                        </Timeline.Item>
                        <div className='PresentCard'> 
                            <ProCard split='vertical'>
                                <ProCard colSpan="85%">
                                    <h3>{activity.activityName}  <Tag color="processing">进行中</Tag></h3>
                                    <Paragraph ellipsis={ellipsis ? { rows: 1, expandable: true, symbol: '展开' } : false}>{activity.activityDesc}</Paragraph>
                                    <div className="icons-list"><LayerLine /> 招商类目：{activity.catogories}</div>
                                    <div className="icons-list"><CalendarOutlined rev={undefined}/> 举办时间：{activity.startTime}-{activity.endTime}</div>
                                    <div className="icons-list"><EnvironmentOutlined rev={undefined}/> 举办地址：{activity.holdAddress}</div>
                                </ProCard>
                                <div className='button'>
                                    <Show></Show>
                                </div>
                            </ProCard>  
                                <p></p>
                        </div>
                    </div>
                    )
                })}
                {pastActivities.map((activity, index) => {
                    return (
                    <div className='Past' key={index}>
                        <Timeline.Item color='grey' className={styles.PastTI}>
                            <h1>{activity.startTime.substring(5,10)}</h1>
                        </Timeline.Item>
                        <div className='PastCard'> 
                            <ProCard>
                                <h3>{activity.activityName}  <Tag color="default"><div className='PastStates'>已结束</div></Tag></h3>
                                <Paragraph ellipsis={ellipsis ? { rows: 1, expandable: true, symbol: '展开' } : false}>{activity.activityDesc}</Paragraph>
                                <div className="icons-list"><LayerLine /> 招商类目：{activity.catogories}</div>
                                <div className="icons-list"><CalendarOutlined rev={undefined}/> 举办时间：{activity.startTime}-{activity.endTime}</div>
                                <div className="icons-list"><EnvironmentOutlined rev={undefined}/> 举办地址：{activity.holdAddress}</div>
                            </ProCard>
                            <p></p>
                        </div>
                    </div>
                    )
                })}
            </Timeline>
        </div>
    )
}