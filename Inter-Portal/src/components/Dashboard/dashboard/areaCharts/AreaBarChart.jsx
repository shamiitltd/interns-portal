import { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../../../../Contexts/ThemeContext";
import { FaArrowUpLong } from "react-icons/fa6";
import { LIGHT_THEME } from "../../../constants/themeConstants";
import "./AreaCharts.scss";

const AreaBarChart = () => {
  return (
    <div className="bar-chart">
      <div className="bar-chart-info">
        <h5 className="bar-chart-title">Recent Activites</h5>
        <div className="chart-info-data">
          <div className="info-data-value">Candidate Performance</div>
          <div className="info-data-text">
            <FaArrowUpLong />
            <p>Task Completion.</p>
          </div>
        </div>
      </div>
      
      <h3>Meetings All Attended</h3> <br />
      <h3>Certificate Downloaded</h3> <br />
      <h3>Rules and Regulations</h3> <br />
      <h3>Upcoming Events updated</h3> <br />
      <h3>Stipend Eligible</h3> <br />
    </div>
  );
};

export default AreaBarChart;
