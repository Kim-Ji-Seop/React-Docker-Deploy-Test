import { PureComponent, useState, useEffect } from 'react';
import { getCookieToken } from "../../store/common/Cookie";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Sector } from 'recharts';
import style from './ManageSale.module.css'
import Header from '../header/Header'
import SideBar from '../sidebar/SideBar'

const ManageSale = () => {
    // 오늘 총 매출
    const [todayTotalSales, setTodayTotalSales] = useState(null);

    // 요일 별 매출
    const [dayOfThisWeekSales, setDayOfThisWeekSales] = useState(null);
    const [dayOfLastWeekSales, setDayOfLastWeekSales] = useState(null);
    const [dayData, setDayData] = useState([
        { name: '월', 이번주: 0, 지난주: 0 },
        { name: '화', 이번주: 0, 지난주: 0 },
        { name: '수', 이번주: 0, 지난주: 0 },
        { name: '목', 이번주: 0, 지난주: 0 },
        { name: '금', 이번주: 0, 지난주: 0 },
        { name: '토', 이번주: 0, 지난주: 0 },
        { name: '일', 이번주: 0, 지난주: 0 },
    ]);

    // 시간 별 매출
    const [todayHourlySales, setTodayHourlySales] = useState(null);
    const [yesterdayHourlySales, setYesterdayHourlySales] = useState(null);
    const [openTime, setOpenTime] = useState(null);
    const [closeTime, setCloseTime] = useState(null);
    const [timeData, setTimeData] = useState(null);

    const token = getCookieToken();

    async function getTodayTotalsales() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-ACCESS-TOKEN': token,
            },
        };
        try {
            const response = await fetch("https://www.insung.shop/jat/sales/today", requestOptions);
            const data = await response.json();

            if (!data.isSuccess) {
                console.log(data.message);
                return;
            }

            return data.result.todayTotalSales;
        } catch (error) {
            console.log('서버가 아직 안켜져있습니다.')
            console.log(error)
        }
    }

    async function getDayOfWeekSales() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-ACCESS-TOKEN': token,
            },
        };
        try {
            const response = await fetch("https://www.insung.shop/jat/sales/weekday", requestOptions);
            const data = await response.json();

            if (!data.isSuccess) {
                console.log(data.message);
                return;
            }

            return data.result;
        } catch (error) {
            console.log('서버가 아직 안켜져있습니다.')
            console.log(error)
        }
    }

    async function getHourlySales() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-ACCESS-TOKEN': token,
            },
        };
        try {
            const response = await fetch("https://www.insung.shop/jat/sales/yesterday", requestOptions);
            const data = await response.json();

            if (!data.isSuccess) {
                console.log(data.message);
                return;
            }

            return data.result;
        } catch (error) {
            console.log('서버가 아직 안켜져있습니다.')
            console.log(error)
        }
    }

    useEffect(() => {
        getTodayTotalsales()
            .then(todayTotalSales => {
                setTodayTotalSales(todayTotalSales);
            })
        getDayOfWeekSales()
            .then(result => {
                setDayOfThisWeekSales(result.thisWeek);
                setDayOfLastWeekSales(result.lastWeek);
            })
        getHourlySales()
            .then(result => {
                setTodayHourlySales(result.salesToday);
                setYesterdayHourlySales(result.salesYesterday);
                setOpenTime(result.storeOpen.split(':')[0]);
                setCloseTime(result.storeClose.split(':')[0]);
            })
    }, []);

    useEffect(() => {
        if (dayOfThisWeekSales && dayOfLastWeekSales) {
            const updatedDayData = dayData.map((dayItem, index) => {
                const thisWeekTotalPrice = dayOfThisWeekSales.find(sale => sale.day === index)?.totalPrice || 0;
                const lastWeekTotalPrice = dayOfLastWeekSales.find(sale => sale.day === index)?.totalPrice || 0;
                return { ...dayItem, 이번주: thisWeekTotalPrice, 지난주: lastWeekTotalPrice };
            });
            setDayData(updatedDayData);
        }
    }, [dayOfThisWeekSales, dayOfLastWeekSales]);

    useEffect(() => {
        if (openTime && closeTime) {
            const startTime = parseInt(openTime, 10); // 오픈시간을 정수형으로 변환
            const endTime = parseInt(closeTime, 10); // 클로즈시간을 정수형으로 변환
        
            // timeData 생성
            const updatedTimeData = [];
            for (let i = startTime; i <= endTime; i++) {
              updatedTimeData.push({
                name: `${i}시`,
                오늘: 0,
                어제: 0,
              });
            }
            setTimeData(updatedTimeData);
          }
    }, [openTime, closeTime]);

    useEffect(() => {
        if (todayHourlySales && yesterdayHourlySales, timeData) {
          const updatedTimeData = [...timeData]; // timeData 복사하여 수정할 배열 생성
      
          todayHourlySales.forEach(sale => {
            const { time, totalSalesPriceInTime } = sale;
            const hour = Number(time.split(' ')[1]); // 시간 부분 추출
            const index = hour - 10; // 시간에 해당하는 인덱스 계산
            updatedTimeData[index].오늘 = totalSalesPriceInTime; // 해당 시간의 오늘 매출액 업데이트
          });
      
          yesterdayHourlySales.forEach(sale => {
            const { time, totalSalesPriceInTime } = sale;
            const hour = Number(time.split(' ')[1]); // 시간 부분 추출
            const index = hour - 10; // 시간에 해당하는 인덱스 계산
            updatedTimeData[index].어제 = totalSalesPriceInTime; // 해당 시간의 어제 매출액 업데이트
          });
      
          setTimeData(updatedTimeData); // 수정된 timeData 업데이트
        }
      }, [todayHourlySales, yesterdayHourlySales, timeData]);

    const data = [
        {
            name: '음식1',
            재주문: 4000,
            신규주문: 2400,
            주소없음: 2400,
        },
        {
            name: '음식2',
            재주문: 3000,
            신규주문: 1398,
            주소없음: 2210,
        },
        {
            name: '음식3',
            재주문: 2000,
            신규주문: 9800,
            주소없음: 2290,
        },
        {
            name: '음식4',
            재주문: 2780,
            신규주문: 3908,
            주소없음: 2000,
        },
        {
            name: '음식5',
            재주문: 1890,
            신규주문: 4800,
            주소없음: 2181,
        },
        {
            name: '음식6',
            재주문: 2390,
            신규주문: 3800,
            주소없음: 2500,
        },
        {
            name: '음식7',
            재주문: 3490,
            신규주문: 4300,
            주소없음: 2100,
        },
    ];

    const pieData = [
        { name: '음식1', value: 700 },
        { name: '음식2', value: 300 },
        { name: '음식3', value: 300 },
        { name: '음식4', value: 200 },
    ];

    const total = pieData.reduce((sum, data) => sum + data.value, 0);

    const pieDataWithPercentage = pieData.map(data => ({
        ...data,
        percentage: ((data.value / total) * 100).toFixed(2),
    }));

    const COLORS = ['#8884d8', '#9F93EA', '#82ca9d', '#C3E8DD', '#DDD1EE'];

    return (
        <div>
            <Header />
            <SideBar />
            <div className={style.mainContainer}>
                <div>
                    <div className={style.todaySales}>사장님,<br />오늘 매출은 {todayTotalSales}원 입니다.</div>
                    <div className={style.salesChartContainer}>
                        <div>
                            <div>시간별 매출</div>
                            <div className={style.salesChart}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        width={593}
                                        height={289}
                                        data={timeData}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="오늘" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        <Line type="monotone" dataKey="어제" stroke="#82ca9d" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div>
                            <div>요일별 매출</div>
                            <div className={style.salesChart}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        width={593}
                                        height={289}
                                        data={dayData}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="이번주" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        <Line type="monotone" dataKey="지난주" stroke="#82ca9d" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={style.todaySales}>월간 메뉴별 판매량</div>
                    <div className={style.salesChartContainer}>
                        <div className={style.salesBarChart}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    width={593}
                                    height={349}
                                    data={data}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="재주문" stackId="a" fill="#8884d8" />
                                    <Bar dataKey="신규주문" stackId="a" fill="#82ca9d" />
                                    <Bar dataKey="주소없음" stackId="a" fill="#DDD1EE" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <PieChart width={260} height={300}>
                            <Pie
                                data={pieData}
                                cx={120}
                                cy={200}
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                        <div className={style.percentage}>
                            {pieDataWithPercentage.map((entry, index) => (
                                <div key={`text-${index}`} className={style.percentageContainer}>
                                    <div className={style.percentageItem}>
                                        <div className={style.percentageItemName}>
                                            <div style={{ width: '24px', height: '14px', backgroundColor: COLORS[index % COLORS.length] }}></div>
                                            <div>{entry.name}</div>
                                        </div>
                                        <div>{entry.percentage}%</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageSale;