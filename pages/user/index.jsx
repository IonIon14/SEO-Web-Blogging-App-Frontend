import { Layout } from "../../components";
import Private from "../../components/auth/Private";
import Link from "next/link";
const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <h2>User dashboard</h2>
      </Private>
    </Layout>
  );
};

export default UserIndex;
