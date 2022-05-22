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

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import { useEffect, useState } from "react";

import getOrders from "./getOrders";

function OrdersOverview() {
  const [lastOrders, setOrders] = useState([])
  
  useEffect(async () => {
    const orders = await getOrders();
    setOrders(orders);
  });
  

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Orders overview
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              24%
            </MDTypography>{" "}
            this month
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        {
          lastOrders.map((order, index) => {
            return <TimelineItem
            key={index}
            color={order.buy ? "warning" : "success"}
            src={`https://invest-brands.cdn-tinkoff.ru/${order.figi}x160.png`}
            title={order.title}
            dateTime={`${order.time} ${order.buy ? `Покупка -${order.price}` : `Продажа ${order.price}`}`}
            lastItem={index == lastOrders.length - 1}
          />
          })
        }
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
