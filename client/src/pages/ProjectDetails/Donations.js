import React, { useEffect, useState } from "react";
import { Statistic, Icon, Table, Loader } from 'semantic-ui-react'
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from 'recharts';
import { DateTime } from "luxon";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 15) * cos;
    const my = cy + (outerRadius + 15) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy - 16} dy={12} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <text x={cx} y={cy + 8} dy={18} textAnchor="middle" fontSize={24} fill={fill}>
                {payload.value}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            {/* <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text> */}
        </g>
    );
};

const Donations = ({ donateList }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [dashboard, setDashboard] = useState([{ name: 'A', value: 500 }]);
    const [sum, setSum] = useState(0);

    useEffect(() => {
        let dashData = [];
        let _sum = 0;
        donateList && donateList.map(item => {
            const ind = dashData.findIndex(x => x.name == item.from);
            if (ind > -1) {
                dashData[ind].value = dashData[ind].value + item.price
            }
            else {
                dashData.push({ name: item.from, value: item.price })
            }
            _sum += item.price;
        })
        setDashboard(dashData);
        setSum(_sum)
    }, [donateList])

    const onPieEnter = (_, index) => { setActiveIndex(index) };

    return <div style={{ display: 'flex', height: 'calc(100% - 43px)' }}>
        <div style={{ display: 'flex', flex: '1', flexDirection: 'column', height: '100%', paddingBottom: '32px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={500} height={500}>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={dashboard}
                        cx="50%"
                        cy="50%"
                        innerRadius={100}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}>
                        {dashboard.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <Statistic>
                <Statistic.Value>
                    <Icon name='dollar' />{new Intl.NumberFormat('en-IN').format(sum)}
                </Statistic.Value>
                <Statistic.Label>Total Donation</Statistic.Label>
            </Statistic>
        </div>
        <div style={{ flex: '2', paddingTop: '8px' }}>
            {
                donateList ? <Table basic='very'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign='center'>From</Table.HeaderCell>
                            <Table.HeaderCell width={1} textAlign='center'>Type</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>IP</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Username</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Message</Table.HeaderCell>
                            <Table.HeaderCell width={2} textAlign='center'>Date</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            donateList && donateList.map((item, ind) =>
                                <Table.Row key={item._id}>
                                    <Table.Cell textAlign='center'>{item.from}</Table.Cell>
                                    <Table.Cell textAlign='center'>{item.icon}</Table.Cell>
                                    <Table.Cell textAlign='center'>{item.ip}</Table.Cell>
                                    <Table.Cell textAlign='center'>{item.username}</Table.Cell>
                                    <Table.Cell textAlign='center'>{item.message}</Table.Cell>
                                    <Table.Cell textAlign='center'>{DateTime.fromMillis(new Date(item.createdDate).getTime()).setLocale('en').toRelative()}</Table.Cell>
                                </Table.Row>)
                        }
                    </Table.Body>
                </Table> : <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}> <Loader active inline='centered' content='Loading' size={'large'} /></div>
            }
        </div>
    </div>
}

export default Donations;