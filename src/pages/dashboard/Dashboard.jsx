import useRedirectLogedOutUser from "../../Hooks/useRedirectLogedOutUser";

const Dashboard = () => {
  useRedirectLogedOutUser("login");
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};

export default Dashboard;
