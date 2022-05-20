/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import getGoods from "./getGoods";

function Projects() {
  const [goods, setGoods] = useState([]);
  const [menu, setMenu] = useState(null);

  useEffect(async () => {
    const newGoods = await getGoods();
    setGoods(newGoods);
  }, []);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Goods
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>30 done</strong> this month
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns: [
            { Header: "stocks", accessor: "companies", width: "45%", align: "left" },
            { Header: "status", accessor: "status", width: "10%", align: "left" },
            { Header: "budget", accessor: "budget", align: "center" },
            { Header: "completion", accessor: "completion", align: "center" },
          ], rows: goods.map(item => {
            return {
              companies: <Company image={`https://invest-brands.cdn-tinkoff.ru/${item.figi}x160.png`} name={item.title} />,
              status: (
                <MDBox display="flex" py={1}>
                  <MDTypography variant="caption" color="text" fontWeight="medium">
                    {item.status}
                  </MDTypography>
                </MDBox>
              ),
              budget: (
                <MDTypography variant="caption" color="text" fontWeight="medium">
                  {item.budget}
                </MDTypography>
              ),
              completion: (
                <MDBox width="8rem" textAlign="left">
                  <MDProgress value={item.completion} color="info" variant="gradient" label={false} />
                </MDBox>
              ),
            }
          }) }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

export default Projects;
