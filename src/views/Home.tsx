import { BackgroundHome, NewLead, TableLeads } from "../components";
import { useState } from "react";
export default function Home() {
  const [refresh, setRefresh] = useState(false);

  const refreshLeads = () => {
    setRefresh(!refresh);
  };

  return (
    <BackgroundHome>
      <NewLead refreshLeads={refreshLeads} />
      <TableLeads refresh={refresh} refreshLeads={refreshLeads} />
    </BackgroundHome>
  );
}
