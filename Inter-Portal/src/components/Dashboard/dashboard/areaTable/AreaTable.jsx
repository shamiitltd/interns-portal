import AreaTableAction from "./AreaTableAction";
import "./AreaTable.scss";

const TABLE_HEADS = [
  "Name of candidate",
  "Unique ID",
  "Date",
  "Morning Standup",
  "Status",
  "Evening Standup",
  "Action",
];

const TABLE_DATA = [
  
  {
    id: 101,
    name: "Shubham Khorge",
    order_id: "#16232",
    date: "sept 6,2024",
    customer: "Present",
    status: "Joined",
    amount: 288,
  },
  {
    id: 102,
    name: "Rohini Zire",
    order_id: "#74454",
    date: "sept 6,2024",
    customer: "Absent",
    status: "joined ",
    amount: 500,
  },
  {
    id: 103,
    name: "Pranchal Sharma",
    order_id: "#45754",
    date: "sept 6,2024",
    customer: "Present",
    status: "Joined",
    amount: 100,
  },


];

const AreaTable = () => {
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Daily Attendance Tracker</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA?.map((dataItem) => {
              return (
                <tr key={dataItem.id}>
                  <td>{dataItem.name}</td>
                  <td>{dataItem.order_id}</td>
                  <td>{dataItem.date}</td>
                  <td>{dataItem.customer}</td>
                  <td>
                    <div className="dt-status">
                      <span
                        className={`dt-status-dot dot-${dataItem.status}`}
                      ></span>
                      <span className="dt-status-text">{dataItem.status}</span>
                    </div>
                  </td>
                  <td>${dataItem.amount.toFixed(2)}</td>
                  <td className="dt-cell-action">
                    <AreaTableAction />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
