import React, { useEffect, useState } from "react";
import { Statistic, Icon, Table } from 'semantic-ui-react'
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

const Donations = ({ settings }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [dashboard, setDashboard] = useState([
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ])
    const [donates, setDonates] = useState([
        {
            _id: 1,
            from: 'Youtube',
            type: '📭',
            name: 'Barış',
            surname: 'Karamustafa',
            message: 'Hello from Turkey 😎',
            date: '2022-05-20T03:24:00'
        }
    ]);

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
                    <Icon name='dollar' />128.00
                </Statistic.Value>
                <Statistic.Label>Total Donation</Statistic.Label>
            </Statistic>
        </div>
        <div style={{ flex: '2', paddingTop: '8px' }}>
            <Table basic='very'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>From</Table.HeaderCell>
                        <Table.HeaderCell width={1} textAlign='center'>Type</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Name</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Surname</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Message</Table.HeaderCell>
                        <Table.HeaderCell width={2} textAlign='center'>Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        donates && donates.map((item, ind) =>
                            <Table.Row key={item._id}>
                                <Table.Cell textAlign='center'>{item.from}</Table.Cell>
                                <Table.Cell textAlign='center'>{item.type}</Table.Cell>
                                <Table.Cell textAlign='center'>{item.name}</Table.Cell>
                                <Table.Cell textAlign='center'>{item.surname}</Table.Cell>
                                <Table.Cell textAlign='center'>{item.message}</Table.Cell>
                                <Table.Cell textAlign='center'>{DateTime.fromMillis(new Date(item.date).getTime()).setLocale('en').toRelative()}</Table.Cell>
                            </Table.Row>)
                    }
                </Table.Body>
            </Table>
        </div>
    </div>
}

export default Donations;