import { AreaCards, AreaCharts, AreaTable, AreaTop } from "../../Dashboard";
import Sidebar from "../../Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="content-area">
      <Sidebar/>
      <AreaTop />
      <AreaCards />
      <AreaCharts />
      <AreaTable />
    </div>
  );
};

export default Dashboard;
