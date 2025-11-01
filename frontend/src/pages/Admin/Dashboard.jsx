import React, { useState, useEffect } from "react";
import {
  FaProjectDiagram,
  FaComments,
  FaAddressBook,
  FaDollarSign,
  FaUsers,
  FaStar,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import MetricCard from "../../components/admin/MetricCard";
import AdminDashbaodLayout from "../../components/layout/AdminDashbaodLayout";

// Mock data - replace with API calls
const mockMetrics = {
  totalProjects: 12,
  totalChats: 48,
  totalContacts: 32,
  totalRevenue: "$4,500",
  activeUsers: 128,
  avgRating: 4.8,
};

const chartData = [
  { name: "Jan", projects: 2, contacts: 5, chats: 8 },
  { name: "Feb", projects: 3, contacts: 8, chats: 12 },
  { name: "Mar", projects: 5, contacts: 10, chats: 15 },
  { name: "Apr", projects: 4, contacts: 7, chats: 13 },
  { name: "May", projects: 6, contacts: 12, chats: 18 },
  { name: "Jun", projects: 5, contacts: 9, chats: 15 },
];

const Dashboard = () => {
  const [metrics] = useState(mockMetrics);

  // In a real app, fetch data from API
  useEffect(() => {
    // fetchMetrics();
    // setMetrics would be used here when fetching from API
  }, []);

  return (
    <AdminDashbaodLayout>
      <div className="admin-analytics-page">
        <div className="admin-page-header">
          <h1 className="admin-page-title">Analytics Dashboard</h1>
          <p className="admin-page-subtitle">
            Overview of your portfolio performance
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="admin-grid admin-grid-3 mb_32">
          <MetricCard
            title="Total Projects"
            value={metrics.totalProjects}
            icon={FaProjectDiagram}
            trend="up"
            trendValue="+12% this month"
          />
          <MetricCard
            title="Total Chats"
            value={metrics.totalChats}
            icon={FaComments}
            trend="up"
            trendValue="+8% this month"
          />
          <MetricCard
            title="Total Contacts"
            value={metrics.totalContacts}
            icon={FaAddressBook}
            trend="up"
            trendValue="+15% this month"
          />
          <MetricCard
            title="Total Revenue"
            value={metrics.totalRevenue}
            icon={FaDollarSign}
            trend="up"
            trendValue="+22% this month"
          />
          <MetricCard
            title="Active Users"
            value={metrics.activeUsers}
            icon={FaUsers}
            trend="up"
            trendValue="+5% this month"
          />
          <MetricCard
            title="Avg Rating"
            value={metrics.avgRating}
            icon={FaStar}
            trend="up"
            trendValue="+0.2 points"
          />
        </div>

        {/* Charts */}
        <div className="admin-grid admin-grid-2 mb_32">
          <div className="admin-chart-card area-effect">
            <h3 className="text_white font-4 mb_24">Monthly Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255, 255, 255, 0.1)"
                />
                <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.5)" />
                <YAxis stroke="rgba(255, 255, 255, 0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(17, 17, 17, 0.95)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend wrapperStyle={{ color: "#fff" }} />
                <Line
                  type="monotone"
                  dataKey="projects"
                  stroke="#45e77b"
                  strokeWidth={2}
                  name="Projects"
                />
                <Line
                  type="monotone"
                  dataKey="contacts"
                  stroke="#2ac6f8"
                  strokeWidth={2}
                  name="Contacts"
                />
                <Line
                  type="monotone"
                  dataKey="chats"
                  stroke="#f8c736"
                  strokeWidth={2}
                  name="Chats"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="admin-chart-card area-effect">
            <h3 className="text_white font-4 mb_24">Activity Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255, 255, 255, 0.1)"
                />
                <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.5)" />
                <YAxis stroke="rgba(255, 255, 255, 0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(17, 17, 17, 0.95)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend wrapperStyle={{ color: "#fff" }} />
                <Bar dataKey="projects" fill="#45e77b" name="Projects" />
                <Bar dataKey="contacts" fill="#2ac6f8" name="Contacts" />
                <Bar dataKey="chats" fill="#f8c736" name="Chats" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminDashbaodLayout>
  );
};

export default Dashboard;
